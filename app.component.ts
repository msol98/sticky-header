import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  startPosition;
  scroll$;
  startingPoint;

  ngOnInit() {
    var header = document.getElementById('header');

    this.startPosition = window.scrollY;
    this.scroll$ = fromEvent(window, 'scroll').subscribe(e => {
      const currentPosition = window.scrollY;

      // If we scrol up, show the header, else hide it
      if (this.startPosition > currentPosition || currentPosition < 60) {
        header.style.top = "0px";
      } else {
        header.style.top = "-100%";
      }

      // Check if we are at the top of the page
      if (currentPosition < 60) {
        this.startingPoint = true;
      } else {
        this.startingPoint = false;
      }

      this.startPosition = currentPosition;
    });
  }

  ngAfterViewChecked(): void {
    this.styleHeader();
  }

  styleHeader() {
    var header = document.getElementById('header');

    header.classList.remove("highlighter");
    header.classList.remove("bg-darkblue");

    // If we are at the top of the page, put highlight animation for the header,
    // else put solid background color for it
    if (this.startingPoint) {
      header.classList.add("highlighter");
    } else {
      header.classList.add("bg-darkblue");
    }
  }

  ngOnDestroy() {
    this.scroll$.unsubscribe();
  }
}
