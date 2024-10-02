import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilUService } from '../servicios/perfil-u.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-u',
  templateUrl: './perfil-u.component.html',
  styleUrls: ['./perfil-u.component.scss'],
})
export class PerfilUComponent implements OnInit {
  perfilForm: FormGroup;
  fotoUser: SafeUrl | null = null;
  actualizarArchivos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilUService,
    private mensajeService: MessageService,
    private sanitizer: DomSanitizer
  ) {
    this.perfilForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.cargarUserPerfil();
    this.cargarUserFoto();
  }

  cargarUserPerfil() {
    console.log('Iniciando carga del perfil de usuario');
    this.perfilService.obtenerUserPerfil().subscribe(
      (data) => {
        console.log('Datos del usuario recibidos:', data);
        if (data && data.name && data.email) {
          this.perfilForm.patchValue({
            name: data.name,
            email: data.email
          });
          console.log('Formulario actualizado con datos del usuario');
        } else {
          console.error('Datos de usuario incompletos o nulos:', data);
          this.mensajeService.add({severity: 'warn', summary: 'Advertencia', detail: 'Datos de usuario incompletos'});
        }
      },
      (error) => {
        console.error('Error al cargar el perfil del usuario:', error);
        if (error.status === 401) {
          console.log('Usuario no autenticado');
          this.mensajeService.add({severity: 'error', summary: 'Error', detail: 'No está autenticado. Por favor, inicie sesión.'});
          // Aquí podrías redirigir al usuario a la página de login si lo deseas
        } else {
          this.mensajeService.add({severity: 'error', summary: 'Error', detail: 'No se pudo cargar la información del perfil'});
        }
      }
    );
  }

  cargarUserFoto() {
    this.perfilService.ObtenerFotoUser().subscribe(
      (blob) => {
        if (blob) {
          const objectURL = URL.createObjectURL(blob);
          this.fotoUser = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        } else {
          this.fotoUser = 'assets/default-profile-picture.png';
        }
      },
      (error) => {
        console.error('Error al cargar la foto del usuario:', error);
        this.fotoUser = 'assets/default-profile-picture.png';
        this.mensajeService.add({severity: 'error', summary: 'Error', detail: 'No se pudo cargar la foto de perfil'});
      }
    );
  }

  onFileSelected(event: any) {
    this.actualizarArchivos = event.files;
  }

  onUpload(event: any) {
    if (this.actualizarArchivos.length > 0) {
      const formData = new FormData();
      formData.append('photo', this.actualizarArchivos[0]);
      formData.append('name',this.perfilForm.get('name').value);
      formData.append('password',this.perfilForm.get('password').value);
      formData.append('email',this.perfilForm.get('email').value);
     
      this.perfilService.actualizarUserPerfil(formData).subscribe(
        (response) => {
          this.mensajeService.add({severity: 'success', summary: 'Éxito', detail: 'Foto de perfil actualizada'});
          this.cargarUserFoto();
        },
        (error) => {
          this.mensajeService.add({severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la foto de perfil'});
        }
      );
    }
  }

  onSubmit() {
    if (this.perfilForm.valid) {
      const formData = new FormData();
      formData.append('name', this.perfilForm.get('name')?.value);
      formData.append('email', this.perfilForm.get('email')?.value);
      if (this.perfilForm.get('password')?.value) {
        formData.append('password', this.perfilForm.get('password')?.value);
      }

      this.perfilService.actualizarUserPerfil(formData).subscribe(
        (response) => {
          this.mensajeService.add({severity: 'success', summary: 'Éxito', detail: 'Perfil actualizado correctamente'});
        },
        (error) => {
          this.mensajeService.add({severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el perfil'});
        }
      );
    }
  }
}
