import { SearchDialogComponent } from './../search-dialog/search-dialog.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, public dialog: MatDialog,) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '450px',
      height: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

}
