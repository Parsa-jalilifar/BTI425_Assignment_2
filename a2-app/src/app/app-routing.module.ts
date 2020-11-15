import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { GetAllEngComponent } from './components/get-all-eng/get-all-eng.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TermEnglishDetailComponent } from './components/term-english-detail/term-english-detail.component';
import { TermEnglishCreateComponent } from './components/term-english-create/term-english-create.component';
import { TermEnglishDefCreateComponent } from './components/term-english-def-create/term-english-def-create.component';
import { TermOtherCreateComponent } from './components/term-other-create/term-other-create.component';
import { TermOtherDetailComponent } from './components/term-other-detail/term-other-detail.component';
import { TermOtherDefnCreateComponent } from './components/term-other-defn-create/term-other-defn-create.component';


const routes: Routes = [
  { path: "home", component: HomePageComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "termsEnglish", component: GetAllEngComponent },
  { path: "termsEnglish/create", component: TermEnglishCreateComponent },
  { path: "termsOther/create/:id", component: TermOtherCreateComponent },
  { path: "termsEnglish/add-definition/:id", component: TermEnglishDefCreateComponent },
  { path: "termsOther/add-definition/:id", component: TermOtherDefnCreateComponent },
  { path: "termsEnglish/detail/:id", component: TermEnglishDetailComponent },
  { path: "termsOther/detail/:id", component: TermOtherDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // it define a default component so when the app runs home component will be shown in page
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
