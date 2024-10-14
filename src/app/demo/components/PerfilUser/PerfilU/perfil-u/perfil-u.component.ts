import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilUService } from '../servicios/perfil-u.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-perfil-u',
  templateUrl: './perfil-u.component.html',
  styleUrls: ['./perfil-u.component.scss'],
})
export class PerfilUComponent implements OnInit, OnDestroy {
  perfilForm: FormGroup;
  fotoUser;
  fotoPreview: SafeUrl | null = null;
  actualizarArchivos: File[] = [];
  private objectUrl: string | null = null;
  mostrarFotoPreview: boolean = false;
  nombreArchivoSeleccionado: string | null = null;

  @ViewChild('fileUpload') fileUpload!: FileUpload;

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

        if(data.photo){
          this.fotoUser = 'http://localhost:8000/api/' + data.photo;
      }else{
          this.fotoUser = 'http://localhost:8000/api/photos/test.jpg';

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

 

  onFileSelected(event: any) {
    const files = event.files;
    if (files.length > 0) {
      const file = files[0];
      this.actualizarArchivos = [file];
      console.log('Archivo seleccionado:', file.name);
    
      //this.nombreArchivoSeleccionado = file.name;
      this.mostrarFotoPreview = false; // No mostrar la previsualización

      // Ya no necesitamos crear una previsualización
      // this.fotoPreview = null;
    }
  }

  extractBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } catch (e) {
        reject(e);
      }
    });
  };

  onSubmit() {
    if (this.perfilForm.valid) {
      const formData = new FormData();
      formData.append('userName', this.perfilForm.get('name')?.value);
      if (this.perfilForm.get('password')?.value) {
        formData.append('password', this.perfilForm.get('password')?.value);
      }

      if (this.actualizarArchivos.length > 0) {
        const file = this.actualizarArchivos[0];
        console.log('Preparando para enviar archivo:', file.name);
        formData.append('photo', file, file.name);
        console.log('Archivo añadido al formData');
      } else {
        console.log('No se seleccionó ningún archivo');
      }

      this.enviarFormulario(formData);
      
    }
  }

  private enviarFormulario(formData: FormData) {
    this.perfilService.actualizarUserPerfil(formData).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.mensajeService.add({severity: 'success', summary: 'Éxito', detail: 'Perfil actualizado correctamente'});
  
        this.fotoPreview = null;
        this.mostrarFotoPreview = false;
        this.nombreArchivoSeleccionado = null;
        this.actualizarArchivos = [];
        this.limpiarFileUpload();
        window.location.reload();
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
        this.mensajeService.add({severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el perfil'});
      }
    );
  }

  limpiarFileUpload() {
    if (this.fileUpload) {
      this.fileUpload.clear(); // Esto limpiará el archivo seleccionado
    }
  }
}

