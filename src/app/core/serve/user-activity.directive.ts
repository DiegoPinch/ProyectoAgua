import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[gstUserActivity]'
})
export class UserActivityDirective {

  constructor() { }
  
  @Output() userActive = new EventEmitter<void>();

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:keydown', ['$event'])
  onUserActivity(event: MouseEvent | KeyboardEvent) {
    this.userActive.emit();
  }

}
