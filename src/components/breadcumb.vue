<template>
    <div>
       <div class="breadcrumb" style="padding: 0.15rem!important;margin-bottom:5px!important">
            <slot name="header">
               <h1>{{page}}</h1>
                    <ul>
                        <li><a href=""> {{folder}} </a></li>
                    </ul>

                <span style=" margin-top: 9px;">| {{montant}} </span>

            </slot>
        </div>

       <!-- <div class="separator-breadcrumb border-top"></div>-->
    </div>
</template>
<script>

export default {
    props:['page','folder','libelle','valeur','montant'],
   
}
</script>

