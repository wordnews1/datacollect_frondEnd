<template>
    <li class="dropdown language-selector">
        Language:
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true">
            <img src="assets/images/flag-uk.png" />
        </a>
        <ul class="dropdown-menu pull-right">
            <li>
                <a href="#">
                    <img src="assets/images/flag-de.png" />
                    <span>Deutsch</span>
                </a>
            </li>
            <li class="active">
                <a href="#">
                    <img src="assets/images/flag-uk.png" />
                    <span>English</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="assets/images/flag-fr.png" />
                    <span>François</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="assets/images/flag-al.png" />
                    <span>Shqip</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="assets/images/flag-es.png" />
                    <span>Español</span>
                </a>
            </li>
        </ul>
    </li>
    <!--<div>
        <b-table small :fields="fields" :items="items" responsive="sm">
            &lt;!&ndash; A virtual column &ndash;&gt;
            <template #cell(index)="data">
                {{ data.index + 1 }}
            </template>

            &lt;!&ndash; A custom formatted column &ndash;&gt;
            <template #cell(name)="data">
                <b class="text-info">{{ data.value.last.toUpperCase() }}</b>, <b>{{ data.value.first }}</b>
            </template>

            &lt;!&ndash; A virtual composite column &ndash;&gt;
            <template #cell(nameage)="data">
                {{ data.item.name.first }} is {{ data.item.age }} years old
            </template>

            &lt;!&ndash; Optional default data cell scoped slot &ndash;&gt;
            <template #cell()="data">
                <i>{{ data.value }}</i>
            </template>
        </b-table>
    </div>-->
</template>

<script>
    export default {
        data() {
            return {
                fields: [
                    // A virtual column that doesn't exist in items
                    'index',
                    // A column that needs custom formatting
                    { key: 'name', label: 'Categorie' },
                    // A regular column
                    'Reference',
                    // A regular column
                    'Prix',
                    'Taxes',
                    // A virtual column made up from two fields
                    { key: 'nameage', label: 'Actions' }
                ],
                items: [
                    { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
                    { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
                    { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
                    { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 }
                ]
            }
        }
    }
</script>