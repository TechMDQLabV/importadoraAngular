import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryAppComponent } from './components/admin/category/category-app/category-app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { InterceptorService } from './services/auth/interceptor.service';
import { TagComponent } from './components/admin/tag/tag.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CategoryAppComponent,
    LoginComponent,
    RegisterComponent,
    TagComponent,
    ProductAddComponent,
    ProductListComponent,
    PageNotFoundComponent    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true      
  }],
  
  bootstrap: [AppComponent],  
})
export class AppModule { }
