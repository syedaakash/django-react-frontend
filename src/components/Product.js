import React,{Component} from 'react';
import {variables} from '../Variables.js'

export class Product extends Component{
    constructor(props){
        super(props);

        this.state={
            products:[],
            id:0,
            name:"",
            description:"",
            price:0,
            available_stock:0,

            productIdFilter:"",
            productNameFilter:"",
            productDescFilter:"",
            productPriceFilter:0,
            availableStockFilter:0,
            productsWithoutFilter:[]
        }
    }

    handleChange = (prod_id, e) => {
        // console.log(prod_id , e.target.checked)
        // fetch(variables.API_URL+'api/product/'+prod_id+'/'+e.target.checked)
        // .then(response=>response.json())
        // .then(data=>{
        //     console.log(data['selected_products'])
        // });
        let updated_products = []
        for(let i=0; i<this.state.products.length;i++) {
            if (this.state.products[i].id === prod_id) {
                if (e.target.checked) {
                    this.state.products[i].is_checked = true
                }
                else {
                    this.state.products[i].is_checked = false
                }
            }
            updated_products.push(this.state.products[i])
        }
        this.setState({products: updated_products})
        
        let selected_products = null
        selected_products = JSON.parse(localStorage.getItem('selected_products'))
        if (localStorage.getItem('selected_products')) {
            if (!selected_products.includes(prod_id)) {
                if (e.target.checked) {
                    selected_products.push(prod_id)
                    localStorage.setItem('selected_products', JSON.stringify(selected_products))
                }
            }
            else {
                if (!e.target.checked) {
                    selected_products = selected_products.filter(prod => prod !== prod_id)
                    localStorage.setItem('selected_products', JSON.stringify(selected_products))
                }
            }
        }
        else {
            localStorage.setItem('selected_products', JSON.stringify([prod_id]))
            selected_products = JSON.parse(localStorage.getItem('selected_products'))
        }

        let searched_products = JSON.parse(localStorage.getItem('searched_products'))
        if (localStorage.getItem('searched_products')) {
            for (let i=0;i<searched_products.length;i++) {
                if (selected_products.includes(searched_products[i].id)) {
                    searched_products[i].is_checked = true
                } else {
                    searched_products[i].is_checked = false
                }
            }
        }
        localStorage.setItem('searched_products', JSON.stringify(searched_products))
    }

    FilterFn = () => {
        var productIdFilter=this.state.productIdFilter;
        var productNameFilter = this.state.productNameFilter;
        var productDescFilter = this.state.productDescFilter;
        var productPriceFilter = this.state.productPriceFilter;
        var availableStockFilter = this.state.availableStockFilter;

        var filteredData=this.state.productsWithoutFilter.filter(
            el => 
                el.id.toString().toLowerCase().includes(
                    productIdFilter.toString().trim().toLowerCase()
                )
                &&
                el.name.toString().toLowerCase().includes(
                    productNameFilter.toString().trim().toLowerCase()
                )
                &&
                el.description.toString().toLowerCase().includes(
                    productDescFilter.toString().trim().toLowerCase()
                )
                // &&
                // el.price.toString().toLowerCase().includes(
                //     productPriceFilter.toString().trim().toLowerCase()
                // )
                &&
                el.available_stock.toString().toLowerCase().includes(
                    availableStockFilter.toString().trim().toLowerCase()
                )
            
        )
        console.log(filteredData)
        this.setState({products:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.productsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({products:sortedData});
    }

    changeProductIdFilter = (e)=>{
        this.state.productIdFilter=e.target.value;
        this.FilterFn();
        // fetch(variables.API_URL+'api/product/'+this.state.productNameFilter)
        // .then(response=>response.json())
        // .then(data=>{
        //     this.setState({products:data,productsWithoutFilter:data});
        // });
    }
    changeProductNameFilter = (e)=>{
        this.state.productNameFilter=e.target.value;
        this.FilterFn();
    }
    changeProductDescFilter = (e)=>{
        this.state.productDescFilter=e.target.value;
        this.FilterFn();
    }
    changeProductPriceFilter = (e)=>{
        this.state.productPriceFilter=e.target.value;
        this.FilterFn();
    }
    changeAvailableStockFilter = (e)=>{
        this.state.availableStockFilter=e.target.value;
        this.FilterFn();
    }

    refreshList = () => {
        fetch(variables.API_URL+'api/product/')
        .then(response=>response.json())
        .then(data=>{
            let selected_products = JSON.parse(localStorage.getItem('selected_products'))
            if (selected_products) {
                for (let i=0;i<data.length;i++){
                    let is_checked = selected_products.includes(data[i]['id'])
                    data[i]['is_checked'] = is_checked
                }
            }
            this.setState({products:data,productsWithoutFilter:data});
        });
    }

    handleSearch = (e) => {
        fetch(variables.API_URL+'api/product/'+(e.target.value ? e.target.value : 'no-prod'))
        .then(response=>response.json())
        .then(data=>{
            let selected_products = JSON.parse(localStorage.getItem('selected_products'))
            if (selected_products) {
                for (let i=0;i<data.length;i++){
                    let is_checked = selected_products.includes(data[i]['id'])
                    data[i]['is_checked'] = is_checked
                }
            }
            this.setState({products:data,productsWithoutFilter:data});

            localStorage.setItem('searched_products',JSON.stringify(data))
        });
    }

    componentDidMount(){
        // this.refreshList();
        if (localStorage.getItem('searched_products')) {
            this.setState({products: JSON.parse(localStorage.getItem('searched_products'))})
        }
    }

    render(){
        const {
            products,
            id,
            name,
            description,
            price,
            available_stock,
        }=this.state;
        return(
            <div className='product-page'>
                <div className="input-group mb-3 search-product">
                    <input type="text" className="form-control" 
                    placeholder="Search Product (Mouse, Macbook, Keyboard, Laptop)"
                     aria-label="Search Product" onChange={(e) => this.handleSearch(e)}/>
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">Search</span>
                    </div>
                </div>
                <table className="table table-striped">
    <thead>
    <tr>
        <th>
        <div className="d-flex flex-row">
            <input className='form-control m-2'
            onChange={this.changeProductIdFilter}
            placeholder='Filter'/>
            <button type="button" style={{padding:0}} className="btn btn-light"
            onClick={()=>this.sortResult('id',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" style={{padding:0}} className="btn btn-light"
            onClick={()=>this.sortResult('id',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            Prduct Id
        </th>
        <th>
        <div className="d-flex flex-row">
            <input className='form-control m-2'
            onChange={this.changeProductNameFilter}
            placeholder='Filter'/>
            <button type="button" style={{padding:0}} className="btn btn-light"
            onClick={()=>this.sortResult('name',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" style={{padding:0}} className="btn btn-light"
            onClick={()=>this.sortResult('name',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
           Name
        </th>
        <th>
        <div className="d-flex flex-row">
            <input className='form-control m-2'
            onChange={this.changeProductDescFilter}
            placeholder='Filter'/>
        <button type="button" style={{padding:0}} className="btn btn-light"
            onClick={()=>this.sortResult('description',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" style={{padding:0}} className="btn btn-light"
            onClick={()=>this.sortResult('description',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
           Description 
        </th>
        <th>
        <div className="d-flex flex-row">
            <input className='form-control m-2'
            onChange={this.changeProductPriceFilter}
            placeholder='Filter'/>
        <button type="button" style={{padding:0}} className="btn btn-light"
            onClick={()=>this.sortResult('price',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" style={{padding:0}} className="btn btn-light"
            onClick={()=>this.sortResult('price',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            Price
        </th>
        <th>
        <div className="d-flex flex-row">
            <input className='form-control m-2'
            onChange={this.changeAvailableStockFilter}
            placeholder='Filter'/>
        <button type="button" style={{padding:0}} className="btn btn-light"
            onClick={()=>this.sortResult('available_stock',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" style={{padding:0}} className="btn btn-light"
            onClick={()=>this.sortResult('available_stock',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
           Available Stock
        </th>
        <th>
           Select Product
        </th>
    </tr>
    </thead>
    <tbody>
        {products.map(prod=>
            <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.description}</td>
                <td>{prod.price}</td>
                <td>{prod.available_stock}</td>
                <td>
                    <div>
                    <input className="form-check-input" type="checkbox"
                    id="checkboxNoLabel" checked={prod.is_checked} onChange={(e) => this.handleChange(prod.id, e)}/>
                    </div>
                </td>
            </tr>
            )}
    </tbody>
    </table>
            </div>
        )
    }
}