import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../serve/auth.service';

@Component({
  selector: 'gst-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  isUserAuthenticated!: boolean ;

  constructor(public authService: AuthService) {
   
  }

  ngOnInit(): void {
    // Verifica si hay una sesión activa
    
  }

  expanded = true;
  toggleExpanded(expanded: boolean) {
    this.expanded = expanded;
  }
}
