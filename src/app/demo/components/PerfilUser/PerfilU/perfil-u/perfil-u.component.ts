import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilUService } from '../servicios/perfil-u.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-u',
  templateUrl: './perfil-u.component.html',
  styleUrls: ['./perfil-u.component.scss'],
})
export class PerfilUComponent implements OnInit, OnDestroy {
  perfilForm: FormGroup;
  fotoUser: SafeUrl | null = null;
  fotoPreview: SafeUrl | null = null;
  actualizarArchivos: File[] = [];
  private objectUrl: string | null = null;

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

  ngOnDestroy() {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
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
      (blob: Blob) => {
        // Convertir el Blob a una URL de objeto
        this.objectUrl = URL.createObjectURL(blob);
        this.fotoUser = this.sanitizer.bypassSecurityTrustUrl(this.objectUrl);
      },
      (error) => {
        console.error('Error al cargar la foto del usuario:', error);
        this.fotoUser = './assets/demo/images/login/avatar.png';
        this.mensajeService.add({severity: 'error', summary: 'Error', detail: 'No se pudo cargar la foto de perfil'});
      }
    );
  }

  onFileSelected(event: any) {
    const files = event.files;
    if (files.length > 0) {
      const file = files[0];
      this.actualizarArchivos = [file];
      
      // Crear preview usando FileReader
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoPreview = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.perfilForm.valid) {
      const formData = new FormData();
      formData.append('userName', this.perfilForm.get('name')?.value);
      if (this.perfilForm.get('password')?.value) {
        formData.append('password', this.perfilForm.get('password')?.value);
      }

      if (this.actualizarArchivos.length > 0) {
        const file = this.actualizarArchivos[0];
        formData.append('photo', file);
      }

      this.enviarFormulario(formData);
    }
  }

  private enviarFormulario(formData: FormData) {
    this.perfilService.actualizarUserPerfil(formData).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.mensajeService.add({severity: 'success', summary: 'Éxito', detail: 'Perfil actualizado correctamente'});
        this.cargarUserFoto(); // Recargar la foto del usuario
        this.fotoPreview = null; // Limpiar la previsualización
        this.actualizarArchivos = []; // Limpiar los archivos seleccionados
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
        this.mensajeService.add({severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el perfil'});
      }
    );
  }
}