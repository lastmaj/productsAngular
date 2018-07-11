import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscriber } from '../../../node_modules/rxjs/Subscriber';

@Component({
    templateUrl : './product-list.component.html',
    styleUrls : ['./product-list.component.css']
})

export class ProductListComponent 
                implements OnInit{
    pageTitle : string = 'Product List';
    imageWidth : number = 30;
    imageMargin : number = 2;
    showImage : boolean = false;
    errorMessage : string;
    
    private _listFilter: string;
    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter? this.performFilter(this.listFilter) : this.products;
    }

    products : IProduct[] = [];
    filteredProducts : IProduct[];
    
    constructor (private _productService: ProductService) {
        this.filteredProducts = this.products;
    }
    
    onRatingClicked(message: string): void{
        this.pageTitle= message;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this._productService.getProducts() 
            .subscribe(returnedArray =>{
                this.products = returnedArray,
                this.filteredProducts = this.products},
                       error => this.errorMessage = <any>error);
        this.filteredProducts = this.products;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}