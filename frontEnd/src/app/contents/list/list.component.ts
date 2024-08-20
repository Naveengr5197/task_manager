import { ActivatedRoute, Params, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { List } from "src/app/models/list";
import { TaskService } from "task.service";
import { Task } from "src/app/models/task";
import { AuthService } from "src/app/auth.service";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  addListForm: FormGroup;
  editListForm: FormGroup;
  display = "none";
  title: string;
  amount: number;
  lists: List[];
  tasks: Task[];
  selectedListId: string;
  gotTasksData: Task[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService
  ) {
    this.addListForm = this.fb.group({
      listName: ["", Validators.compose([Validators.required])],
    });
    this.editListForm = this.fb.group({
      listName: ["", Validators.compose([Validators.required])],
    });
  }

  createList(value) {
    this.taskService.createList(value.listName).subscribe((list: List) => {
      console.log(list);
      // Now we navigate to /lists/task._id
      this.router.navigate(["/lists", list._id]);
    });
  }
  resetForm() {
    this.addListForm.reset();
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params: Params) => {
      if (params.listId) {
        this.selectedListId = params.listId;
        this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        });
      } else {
        this.tasks = undefined;
      }
    });

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });
  }


  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }

  onLogoutClick(){
    this.authService.logout();
  }


}
