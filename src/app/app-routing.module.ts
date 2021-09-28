import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './Usuarios/usuario/usuario.component';
import { ChatComponent } from './chat/chat.component';
import { InicioComponent } from './Menus/inicio/inicio.component';
import { LoginComponent } from './Usuarios/login/login.component';
import { RegisterComponent } from './Usuarios/register/register.component';
import { PerfilComponent } from './Usuarios/perfil/perfil.component';
import { AuthGuard } from './auth.guard';
import { AsignaturasAdminComponent } from './Asignaturas/asignaturas-admin/asignaturas-admin.component';
import { NuevaAsignaturaComponent } from './Asignaturas/nueva-asignatura/nueva-asignatura.component';
import { VerAsignaturaComponent } from './Asignaturas/ver-asignatura/ver-asignatura.component';
import { EditarHorarioComponent } from './Asignaturas/editar-horario/editar-horario.component';
import { NuevoHorarioComponent } from './Asignaturas/nuevo-horario/nuevo-horario.component';
import { NuevaEvaluacionComponent } from './Asignaturas/nueva-evaluacion/nueva-evaluacion.component';
import { AgregarAsignaturaUsuarioComponent } from './Usuarios/agregar-asignatura-usuario/agregar-asignatura-usuario.component';
import { PreguntaComponent } from './preguntas/pregunta/pregunta.component';
import { FeriadoComponent } from './feriados/feriado/feriado.component';
import { NuevapreguntaComponent } from './preguntas/nuevapregunta/nuevapregunta.component';
import { NuevoFeriadoComponent } from './feriados/nuevo-feriado/nuevo-feriado.component';
import { ExcelComponent } from './excels/excel/excel.component';
import { PreviaturasComponent } from './previaturas/previaturas.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StaticsAsignaturasComponent } from './statics-asignaturas/statics-asignaturas.component';
import { SubjectMaterialComponent } from './subject-material/subject-material.component';
import { ShowSubjectComponent } from './Asignaturas/show-subject/show-subject.component';
import { UnansweredQuestionComponent } from './preguntas/unanswered-question/unanswered-question.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [!AuthGuard] },
  { path: 'inicio', component: InicioComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'asignaturasAdmin', component: AsignaturasAdminComponent },
  { path: 'nuevaAsignatura', component: NuevaAsignaturaComponent },
  { path: 'verAsignatura', component: VerAsignaturaComponent },
  { path: 'verHorario', component: EditarHorarioComponent },
  { path: 'nuevoHorario', component: NuevoHorarioComponent },
  { path: 'nuevaEvaluacion', component: NuevaEvaluacionComponent },
  { path: 'agregarAsig', component: AgregarAsignaturaUsuarioComponent },
  { path: 'preguntas', component: PreguntaComponent },
  { path: 'nuevaPregunta', component: NuevapreguntaComponent },
  { path: 'feriados', component: FeriadoComponent },
  { path: 'nuevoFeriado', component: NuevoFeriadoComponent },
  { path: 'excels', component: ExcelComponent },
  { path: 'previaturas', component: PreviaturasComponent },
  { path: 'estadisticas', component: StatisticsComponent },
  { path: 'estadisticas-asignatura', component: StaticsAsignaturasComponent },
  { path: 'material-asignatura', component: SubjectMaterialComponent },
  { path: 'ver-asignatura', component: ShowSubjectComponent },
  { path: 'preguntas-pendientes', component: UnansweredQuestionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }