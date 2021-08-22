import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './Usuarios/usuario/usuario.component';
import { ChatComponent } from './chat/chat.component';
import { MenuAdminComponent } from './Menus/menu-admin/menu-admin.component';
import { InicioComponent } from './Menus/inicio/inicio.component';
import { LoginComponent } from './Usuarios/login/login.component';
import { RegisterComponent } from './Usuarios/register/register.component';
import { PerfilComponent } from './Usuarios/perfil/perfil.component';
import { AuthGuard } from './auth.guard';
import { AsignaturasAdminComponent } from './Asignaturas/asignaturas-admin/asignaturas-admin.component';
import { NuevaAsignaturaComponent } from './Asignaturas/nueva-asignatura/nueva-asignatura.component';
import { VerAsignaturaComponent } from './Asignaturas/ver-asignatura/ver-asignatura.component';
import { HorariosAsignaturasComponent } from './Asignaturas/horarios-asignaturas/horarios-asignaturas.component';
import { EditarHorarioComponent } from './Asignaturas/editar-horario/editar-horario.component';
import { NuevoHorarioComponent } from './Asignaturas/nuevo-horario/nuevo-horario.component';
import { EvaluacionesAsignaturaComponent } from './Asignaturas/evaluaciones-asignatura/evaluaciones-asignatura.component';
import { NuevaEvaluacionComponent } from './Asignaturas/nueva-evaluacion/nueva-evaluacion.component';
import { ProgresoComponent } from './Usuarios/progreso/progreso.component';
import { AgregarAsignaturaUsuarioComponent } from './Usuarios/agregar-asignatura-usuario/agregar-asignatura-usuario.component';
import { PreguntaComponent } from './preguntas/pregunta/pregunta.component';
import { FeriadoComponent } from './feriados/feriado/feriado.component';
import { NuevapreguntaComponent } from './preguntas/nuevapregunta/nuevapregunta.component';
import { NuevoFeriadoComponent } from './feriados/nuevo-feriado/nuevo-feriado.component';
import { ExcelComponent } from './excels/excel/excel.component';




const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent,canActivate:[!AuthGuard] },
  { path: 'inicio', component: InicioComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'menuadmin', component: MenuAdminComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'perfil', component: PerfilComponent,canActivate:[AuthGuard] },
  { path: 'asignaturasAdmin', component: AsignaturasAdminComponent},
  { path: 'nuevaAsignatura', component: NuevaAsignaturaComponent},
  { path: 'verAsignatura', component: VerAsignaturaComponent},
  { path: 'horarios', component: HorariosAsignaturasComponent},
  { path: 'verHorario', component: EditarHorarioComponent},
  { path: 'nuevoHorario', component: NuevoHorarioComponent},
  { path: 'evaluaciones', component: EvaluacionesAsignaturaComponent},
  { path: 'nuevaEvaluacion', component: NuevaEvaluacionComponent},
  { path: 'progreso', component: ProgresoComponent},
  { path: 'agregarAsig', component: AgregarAsignaturaUsuarioComponent},
  { path: 'preguntas', component: PreguntaComponent},
  { path: 'nuevaPregunta', component: NuevapreguntaComponent},
  { path: 'feriados', component: FeriadoComponent},
  { path: 'nuevoFeriado', component: NuevoFeriadoComponent},
  { path: 'excels', component: ExcelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }