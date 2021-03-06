import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatListModule, MatCardModule, MatSlideToggleModule, MatDialogModule,
  MatIconModule, MatInputModule, MatSnackBarModule, MatTabsModule,
  MatButtonModule,MatLineModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionComponent } from './collection/collection.component';
import { RatingCategoryPipe } from './pipes/rating-category.pipe';
import { RatingComponent } from './rating/rating.component';
import { HttpClientModule } from '@angular/common/http';
import { TabsComponent } from './tabs/tabs.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CollectionComponent,
    RatingCategoryPipe,
    RatingComponent,
    TabsComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatListModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatLineModule,
    MatInputModule,
    MatToolbarModule,
    NoopAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
