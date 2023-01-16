import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { TagsModule } from './pages/tags/tags.module';
import { SuggestionsComponent } from './pages/suggestions/suggestions.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SuggestionsComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    TagsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
