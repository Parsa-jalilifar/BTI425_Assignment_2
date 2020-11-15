import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DataManagerService } from './data-manager.service';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GetAllEngComponent } from './components/get-all-eng/get-all-eng.component';
import { TermEnglishDetailComponent } from './components/term-english-detail/term-english-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TermEnglishCreateComponent } from './components/term-english-create/term-english-create.component';
import { TermEnglishDefCreateComponent } from './components/term-english-def-create/term-english-def-create.component';
import { TermOtherCreateComponent } from './components/term-other-create/term-other-create.component';
import { TermOtherDetailComponent } from './components/term-other-detail/term-other-detail.component';
import { TermOtherDefnCreateComponent } from './components/term-other-defn-create/term-other-defn-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    GetAllEngComponent,
    TermEnglishDetailComponent,
    TermEnglishCreateComponent,
    TermEnglishDefCreateComponent,
    TermOtherCreateComponent,
    TermOtherDetailComponent,
    TermOtherDefnCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
