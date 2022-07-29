<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\SubSubCategory;
use App\Category;
use App\Cart;
use Auth;
use Session;
use App\Color;
use Cookie;
use App\Address;
use Log;
use App\Order;
use App\CombinedOrder;
use App\Utility\NotificationUtility;

class CartController extends Controller
{

    public function store_delivery_info(Request $request)
    {
        if(auth()->user() != null) {
            $carts = Cart::where('user_id', Auth::user()->id)
                ->get();
        }else{
            $temp_user_id = $request->session()->get('temp_user_id');
            // $carts = Cart::where('temp_user_id', $temp_user_id)->get();
            $carts = ($temp_user_id != null) ? Cart::where('temp_user_id', $temp_user_id)->get() : [] ;
        }


        /**/

        if($carts->isEmpty()) {
            flash(translate('Your cart is empty'))->warning();
            return redirect()->route('home');
        }
        //statifier l id de l adresse
        if(auth()->user() != null) {
            $shipping_info = Address::where('id', Auth::user()->id)->first();
        }else{
            Log::info('shipping '.$request->session()->get('temp_user_id'));
            $shipping_info = Address::where('id', $request->session()->get('temp_user_id'))->first();
            Session::put('temp_infos', $request->session()->get('temp_user_id'));
        }

        $total = 0;
        $tax = 0;
        $shipping = 0;
        $subtotal = 0;

        if ($carts && count($carts) > 0) {
            foreach ($carts as $key => $cartItem) {
                $product = \App\Product::find($cartItem['product_id']);
                $tax += $cartItem['tax'] * $cartItem['quantity'];
                $subtotal += $cartItem['price'] * $cartItem['quantity'];

                if ($request['shipping_type_' . $product->user_id] == 'pickup_point') {
                    $cartItem['shipping_type'] = 'pickup_point';
                    $cartItem['pickup_point'] = $request['pickup_point_id_' . $product->user_id];
                } else {
                    $cartItem['shipping_type'] = 'home_delivery';
                }
                $cartItem['shipping_cost'] = 0;
                if ($cartItem['shipping_type'] == 'home_delivery') {
                    $cartItem['shipping_cost'] = getShippingCost($carts, $key);
                }

                if(isset($cartItem['shipping_cost']) && is_array(json_decode($cartItem['shipping_cost'], true))) {

                    foreach(json_decode($cartItem['shipping_cost'], true) as $shipping_region => $val) {
                        if($shipping_info['city'] == $shipping_region) {
                            $cartItem['shipping_cost'] = (double)($val);
                            break;
                        } else {
                            $cartItem['shipping_cost'] = 0;
                        }
                    }
                } else {
                    if (!$cartItem['shipping_cost'] ||
                        $cartItem['shipping_cost'] == null ||
                        $cartItem['shipping_cost'] == 'null') {

                        $cartItem['shipping_cost'] = 0;
                    }
                }

                $shipping += $cartItem['shipping_cost'];
                $cartItem->save();

            }
            $total = $subtotal + $tax + $shipping;
            return view('frontend.payment_select', compact('carts', 'shipping_info', 'total'));

        } else {
            flash(translate('Your Cart was empty'))->warning();
            return redirect()->route('home');
        }
    }
    public function index(Request $request)
    {
        //dd($cart->all());
        $categories = Category::all();
        if(auth()->user() != null) {
            $user_id = Auth::user()->id;
            if($request->session()->get('temp_user_id')) {
                Cart::where('temp_user_id', $request->session()->get('temp_user_id'))
                    ->update(
                        [
                            'user_id' => $user_id,
                            'temp_user_id' => null
                        ]
                    );

                Session::forget('temp_user_id');
            }
            $carts = Cart::where('user_id', $user_id)->get();
        } else {
            $temp_user_id = $request->session()->get('temp_user_id');
            // $carts = Cart::where('temp_user_id', $temp_user_id)->get();
            $carts = ($temp_user_id != null) ? Cart::where('temp_user_id', $temp_user_id)->get() : [] ;
        }

        return view('frontend.view_cart', compact('categories', 'carts'));
    }

    public function showCartModal(Request $request)
    {
        $product = Product::find($request->id);
        return view('frontend.partials.addToCart', compact('product'));
    }

    public function showCartModalAuction(Request $request)
    {
        $product = Product::find($request->id);
        return view('auction.frontend.addToCartAuction', compact('product'));
    }

    public function addToCart(Request $request)
    {
        $product = Product::find($request->id);
        $carts = array();
        $data = array();

        if(auth()->user() != null) {
            $user_id = Auth::user()->id;
            $data['user_id'] = $user_id;
            $carts = Cart::where('user_id', $user_id)->get();
        } else {
            if($request->session()->get('temp_user_id')) {
                $temp_user_id = $request->session()->get('temp_user_id');
            } else {
                $temp_user_id = bin2hex(random_bytes(10));
                $request->session()->put('temp_user_id', $temp_user_id);
            }
            $data['temp_user_id'] = $temp_user_id;
            $carts = Cart::where('temp_user_id', $temp_user_id)->get();
        }

        $data['product_id'] = $product->id;
        $data['owner_id'] = $product->user_id;

        $str = '';
        $tax = 0;
        if($product->auction_product == 0){
            if($product->digital != 1 && $request->quantity < $product->min_qty) {
                return array(
                    'status' => 0,
                    'cart_count' => count($carts),
                    'modal_view' => view('frontend.partials.minQtyNotSatisfied', [ 'min_qty' => $product->min_qty ])->render(),
                    'nav_cart_view' => view('frontend.partials.cart')->render(),
                );
            }

            //check the color enabled or disabled for the product
            if($request->has('color')) {
                $str = $request['color'];
            }

            if ($product->digital != 1) {
                //Gets all the choice values of customer choice option and generate a string like Black-S-Cotton
                foreach (json_decode(Product::find($request->id)->choice_options) as $key => $choice) {
                    if($str != null){
                        $str .= '-'.str_replace(' ', '', $request['attribute_id_'.$choice->attribute_id]);
                    }
                    else{
                        $str .= str_replace(' ', '', $request['attribute_id_'.$choice->attribute_id]);
                    }
                }
            }

            $data['variation'] = $str;

            if($str != null && $product->variant_product){
                $product_stock = $product->stocks->where('variant', $str)->first();
                $price = $product_stock->price;
                $quantity = $product_stock->qty;

                if($quantity < $request['quantity']){
                    return array(
                        'status' => 0,
                        'cart_count' => count($carts),
                        'modal_view' => view('frontend.partials.outOfStockCart')->render(),
                        'nav_cart_view' => view('frontend.partials.cart')->render(),
                    );
                }
            }

            else{
                $price = $product->unit_price;
            }

            //discount calculation
            $discount_applicable = false;

            if ($product->discount_start_date == null) {
                $discount_applicable = true;
            }
            elseif (strtotime(date('d-m-Y H:i:s')) >= $product->discount_start_date &&
                strtotime(date('d-m-Y H:i:s')) <= $product->discount_end_date) {
                $discount_applicable = true;
            }

            if ($discount_applicable) {
                if($product->discount_type == 'percent'){
                    $price -= ($price*$product->discount)/100;
                }
                elseif($product->discount_type == 'amount'){
                    $price -= $product->discount;
                }
            }

            //calculation of taxes
            foreach ($product->taxes as $product_tax) {
                if($product_tax->tax_type == 'percent'){
                    $tax += ($price * $product_tax->tax) / 100;
                }
                elseif($product_tax->tax_type == 'amount'){
                    $tax += $product_tax->tax;
                }
            }

            $data['quantity'] = $request['quantity'];
            $data['price'] = $price;
            $data['tax'] = $tax;
            //$data['shipping'] = 0;
            $data['shipping_cost'] = 0;
            $data['product_referral_code'] = null;
            $data['cash_on_delivery'] = $product->cash_on_delivery;
            $data['digital'] = $product->digital;

            if ($request['quantity'] == null){
                $data['quantity'] = 1;
            }

            if(Cookie::has('referred_product_id') && Cookie::get('referred_product_id') == $product->id) {
                $data['product_referral_code'] = Cookie::get('product_referral_code');
            }

            if($carts && count($carts) > 0){
                $foundInCart = false;

                foreach ($carts as $key => $cartItem){
                    $cart_product = Product::where('id', $cartItem['product_id'])->first();
                    if($cart_product->auction_product == 1){
                        return array(
                            'status' => 0,
                            'cart_count' => count($carts),
                            'modal_view' => view('frontend.partials.auctionProductAlredayAddedCart')->render(),
                            'nav_cart_view' => view('frontend.partials.cart')->render(),
                        );
                    }

                    if($cartItem['product_id'] == $request->id) {
                        $product_stock = $product->stocks->where('variant', $str)->first();
                        $quantity = $product_stock->qty;
                        if($quantity < $cartItem['quantity'] + $request['quantity']){
                            return array(
                                'status' => 0,
                                'cart_count' => count($carts),
                                'modal_view' => view('frontend.partials.outOfStockCart')->render(),
                                'nav_cart_view' => view('frontend.partials.cart')->render(),
                            );
                        }
                        if(($str != null && $cartItem['variation'] == $str) || $str == null){
                            $foundInCart = true;

                            $cartItem['quantity'] += $request['quantity'];
                            $cartItem->save();
                        }
                    }
                }
                if (!$foundInCart) {
                    Cart::create($data);
                }
            }
            else{
                Cart::create($data);
            }

            if(auth()->user() != null) {
                $user_id = Auth::user()->id;
                $carts = Cart::where('user_id', $user_id)->get();
            } else {
                $temp_user_id = $request->session()->get('temp_user_id');
                $carts = Cart::where('temp_user_id', $temp_user_id)->get();
            }
            return array(
                'status' => 1,
                'cart_count' => count($carts),
                'modal_view' => view('frontend.partials.addedToCart', compact('product', 'data'))->render(),
                'nav_cart_view' => view('frontend.partials.cart')->render(),
            );
        }
        else{

            $price = $product->bids->max('amount');

            foreach ($product->taxes as $product_tax) {
                if($product_tax->tax_type == 'percent'){
                    $tax += ($price * $product_tax->tax) / 100;
                }
                elseif($product_tax->tax_type == 'amount'){
                    $tax += $product_tax->tax;
                }
            }

            $data['quantity'] = 1;
            $data['price'] = $price;
            $data['tax'] = $tax;
            $data['shipping_cost'] = 0;
            $data['product_referral_code'] = null;
            $data['cash_on_delivery'] = $product->cash_on_delivery;
            $data['digital'] = $product->digital;

            if(count($carts) == 0){
                Cart::create($data);
            }
            if(auth()->user() != null) {
                $user_id = Auth::user()->id;
                $carts = Cart::where('user_id', $user_id)->get();
            } else {
                $temp_user_id = $request->session()->get('temp_user_id');
                $carts = Cart::where('temp_user_id', $temp_user_id)->get();
            }
            return array(
                'status' => 1,
                'cart_count' => count($carts),
                'modal_view' => view('frontend.partials.addedToCart', compact('product', 'data'))->render(),
                'nav_cart_view' => view('frontend.partials.cart')->render(),
            );
        }
    }

    //removes from Cart
    public function removeFromCart(Request $request)
    {
        Cart::destroy($request->id);
        if(auth()->user() != null) {
            $user_id = Auth::user()->id;
            $carts = Cart::where('user_id', $user_id)->get();
        } else {
            $temp_user_id = $request->session()->get('temp_user_id');
            $carts = Cart::where('temp_user_id', $temp_user_id)->get();
        }

        return array(
            'cart_count' => count($carts),
            'cart_view' => view('frontend.partials.cart_details', compact('carts'))->render(),
            'nav_cart_view' => view('frontend.partials.cart')->render(),
        );
    }

    //updated the quantity for a cart item
    public function updateQuantity(Request $request)
    {
        $object = Cart::findOrFail($request->id);

        if($object['id'] == $request->id){
            $product = \App\Product::find($object['product_id']);
            $product_stock = $product->stocks->where('variant', $object['variation'])->first();
            $quantity = $product_stock->qty;

            if($quantity >= $request->quantity) {
                if($request->quantity >= $product->min_qty){
                    $object['quantity'] = $request->quantity;
                }
            }

            $object->save();
        }

        if(auth()->user() != null) {
            $user_id = Auth::user()->id;
            $carts = Cart::where('user_id', $user_id)->get();
        } else {
            $temp_user_id = $request->session()->get('temp_user_id');
            $carts = Cart::where('temp_user_id', $temp_user_id)->get();
        }

        return array(
            'cart_count' => count($carts),
            'cart_view' => view('frontend.partials.cart_details', compact('carts'))->render(),
            'nav_cart_view' => view('frontend.partials.cart')->render(),
        );
    }

    public function checkout(Request $request)
    {
        if ($request->payment_option != null) {
            $orderController = new OrderController;
            $orderController->store($request);

            $request->session()->put('payment_type', 'cart_payment');


            if ($request->session()->get('combined_order_id') != null) {
                $combined_order = CombinedOrder::findOrFail($request->session()->get('combined_order_id'));
                $amount = $combined_order->grand_total;
                $numero = $combined_order->numero;



                if ($request->payment_option == 'orangemoney') {
                    $data = array(
                        'service'      => 'ORANGE',
                        'amount'    => $amount,
                        'number'       => $numero,
                        'order_id'     => $combined_order,
                        'message' => 'Wely Market Payment'
                    );

                    $url = "https://payment.ccntechnologies.us/payment";
                    $content = json_encode($data);

                    $curl = curl_init($url);
                    curl_setopt($curl, CURLOPT_HEADER, false);
                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($curl, CURLOPT_HTTPHEADER,
                        array("Content-type: application/json"));
                    curl_setopt($curl, CURLOPT_TIMEOUT, 60000);
                    curl_setopt($curl, CURLOPT_POST, true);
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

                    $json_response = curl_exec($curl);

                    //$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

                    /* if ( $status != 201 ) {
                         die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
                     }*/


                    curl_close($curl);

                    $response = json_decode($json_response, true);
                    /*if($response==null){

                        flash(translate('Timeout Exceeded! Please Retry'))->warning();

                           return redirect()->route('checkout.store_shipping_infostore');
                    Log::info('s00 '.$json_response);

                   }else{
                       if (array_key_exists('status',$response)){

                       if($response['status']==200){

                           Log::info('status '.'success');

                           return $this->checkout_done($request->session()->get('combined_order_id'), json_encode($response));
                       }else{
                           flash(translate('You have Cancelled Payment! Please Retry'))->warning();

                           return redirect()->route('checkout.store_shipping_infostore');

                       }
                   }}*/

                } elseif ($request->payment_option == 'mtnmoney') {
                    $data = array(
                        'service'      => 'MTN',
                        'amount'    => $amount,
                        'number'       => $numero,
                        'order_id'     => $combined_order,
                        'message' => 'Wely Market Payment'
                    );
                    $url = "https://payment.ccntechnologies.us/payment";
                    $content = json_encode($data);

                    $curl = curl_init($url);
                    curl_setopt($curl, CURLOPT_HEADER, false);
                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($curl, CURLOPT_HTTPHEADER,
                        array("Content-type: application/json"));
                    curl_setopt($curl, CURLOPT_POST, true);
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

                    $json_response = curl_exec($curl);

                    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

                    /*  if ( $status != 201 ) {
                          /*die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
                           //curl_close($curl);
                       $response = json_decode($json_response, true);
                      if (array_key_exists('status',$response)){

                          if($response['status']==200){

                              $this->checkout_done($request->session()->get('combined_order_id'), json_encode($response));
                          }else{

                          }

                      }
                      }*/


                    curl_close($curl);
                    $response = json_decode($json_response, true);
                    /*if($response==null){

                       flash(translate('Timeout Exceeded! Please Retry'))->warning();

                          return redirect()->route('checkout.store_shipping_infostore');
                   Log::info('s00 '.$json_response);
                    }else{
                   //Log::info('s00 '.$json_response);
                  if (array_key_exists('status',$response)){

                      if($response['status']==200){

                          Log::info('status '.'success');

                          return $this->checkout_done($request->session()->get('combined_order_id'), json_encode($response));
                      }else{
                          flash(translate('You have Cancelled Payment! Please Retry'))->warning();

                          return redirect()->route('checkout.store_shipping_infostore');

                      }

                  }

                    }*/




                    /*    $paypal = new PaypalController;
                        return $paypal->getCheckout();
                    } elseif ($request->payment_option == 'stripe') {
                        $stripe = new StripePaymentController;
                        return $stripe->stripe();
                    } elseif ($request->payment_option == 'sslcommerz') {
                        $sslcommerz = new PublicSslCommerzPaymentController;
                        return $sslcommerz->index($request);
                    } elseif ($request->payment_option == 'instamojo') {
                        $instamojo = new InstamojoController;
                        return $instamojo->pay($request);
                    } elseif ($request->payment_option == 'razorpay') {
                        $razorpay = new RazorpayController;
                        return $razorpay->payWithRazorpay($request);
                    } elseif ($request->payment_option == 'proxypay') {
                        //$proxy = new ProxypayController;
                        //return $proxy->create_reference($request);
                    } elseif ($request->payment_option == 'paystack') {
                        if (\App\Addon::where('unique_identifier', 'otp_system')->first() != null &&
                            \App\Addon::where('unique_identifier', 'otp_system')->first()->activated &&
                            !Auth::user()->email) {
                            flash(translate('Your email should be verified before order'))->warning();
                            return redirect()->route('cart')->send();
                        }
                        $paystack = new PaystackController;
                        return $paystack->redirectToGateway($request);
                    } elseif ($request->payment_option == 'voguepay') {
                        $voguePay = new VoguePayController;
                        return $voguePay->customer_showForm();
                    } elseif ($request->payment_option == 'payhere') {
                        $combined_order = CombinedOrder::findOrFail($request->session()->get('combined_order_id'));

                        $combined_order_id = $combined_order->id;
                        $amount = $combined_order->grand_total;
                        $first_name = json_decode($combined_order->shipping_address)->name;
                        $last_name = 'X';
                        $phone = json_decode($combined_order->shipping_address)->phone;
                        $email = json_decode($combined_order->shipping_address)->email;
                        $address = json_decode($combined_order->shipping_address)->address;
                        $city = json_decode($combined_order->shipping_address)->city;

                        return PayhereUtility::create_checkout_form($combined_order_id, $amount, $first_name, $last_name, $phone, $email, $address, $city);
                    } elseif ($request->payment_option == 'payfast') {
                        $combined_order = CombinedOrder::findOrFail($request->session()->get('combined_order_id'));

                        $combined_order_id = $combined_order->id;
                        $amount = $combined_order->grand_total;

                        return PayfastUtility::create_checkout_form($combined_order_id, $amount);
                    } else if ($request->payment_option == 'ngenius') {
                        $ngenius = new NgeniusController();
                        return $ngenius->pay();
                    } else if ($request->payment_option == 'iyzico') {
                        $iyzico = new IyzicoController();
                        return $iyzico->pay();
                    } else if ($request->payment_option == 'nagad') {
                        $nagad = new NagadController;
                        return $nagad->getSession();
                    } else if ($request->payment_option == 'bkash') {
                        $bkash = new BkashController;
                        return $bkash->pay();
                    } else if ($request->payment_option == 'aamarpay') {
                        $aamarpay = new AamarpayController;
                        return $aamarpay->index();
                    } else if ($request->payment_option == 'flutterwave') {
                        $flutterwave = new FlutterwaveController();
                        return $flutterwave->pay();
                    } else if ($request->payment_option == 'mpesa') {
                        $mpesa = new MpesaController();
                        return $mpesa->pay();
                    } elseif ($request->payment_option == 'paytm') {
                        if (Auth::user()->phone == null) {
                            flash('Please add phone number to your profile')->warning();
                            return redirect()->route('profile');
                        }

                        $paytm = new PaytmController;
                        return $paytm->index();

                    } elseif ($request->payment_option == 'wallet') {
                        $user = Auth::user();
                        $combined_order = CombinedOrder::findOrFail($request->session()->get('combined_order_id'));
                        if ($user->balance >= $combined_order->grand_total) {
                            $user->balance -= $combined_order->grand_total;
                            $user->save();
                            return $this->checkout_done($request->session()->get('combined_order_id'), null);
                        }*/
                } elseif ($request->payment_option == 'cash_on_delivery') {
                    flash(translate("Your order has been placed successfully"))->success();
                    return redirect()->route('order_confirmed');
                } else {
                    flash(translate('Select Payment Option.'))->warning();
                    return back();
                    /*$combined_order = CombinedOrder::findOrFail($request->session()->get('combined_order_id'));
                    foreach ($combined_order->orders as $order) {
                        $order->manual_payment = 1;
                        $order->save();
                    }
                    flash(translate('Your order has been placed successfully. Please submit payment information from purchase history'))->success();
                    return redirect()->route('order_confirmed');*/
                }
            }
        } else {
            flash(translate('Select Payment Option.'))->warning();
            return back();
        }
    }

    //redirects to this method after a successfull checkout
    public function checkout_done($combined_order_id, $payment)
    {
        $combined_order = CombinedOrder::findOrFail($combined_order_id);



        foreach ($combined_order->orders as $key => $order) {
            $order = Order::findOrFail($order->id);
            $order->payment_status = 'paid';
            $order->payment_details = $payment;
            $order->save();

            calculateCommissionAffilationClubPoint($order);
        }

        Session::put('combined_order_id', $combined_order_id);
        Log::info("status "."success1");
        return redirect()->route('order_confirmed');


    }

    public function order_confirmed()
    {
        Log::info("status "."order");
        $combined_order = CombinedOrder::findOrFail(Session::get('combined_order_id'));


        Cart::where('user_id', $combined_order->user_id)
            ->delete();

        //Session::forget('club_point');
        //Session::forget('combined_order_id');

        foreach($combined_order->orders as $order){
            NotificationUtility::sendOrderPlacedNotification($order);
        }

        return view('frontend.order_confirmed', compact('combined_order'));
    }
}
