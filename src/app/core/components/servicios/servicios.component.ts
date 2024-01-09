import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../serve/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gst-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  isUserAuthenticated!: boolean ;

  constructor(public authService: AuthService, private router: Router) {
   
  }
  

  abrirComponente(): void {
    
    this.router.navigate(['/servicios/configuracion']);
  }
  
  ngOnInit(): void {
    // Verifica si hay una sesión activa
    
  }

  expanded = true;
  toggleExpanded(expanded: boolean) {
    this.expanded = expanded;
  }

  
}
