import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/task.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Task } from "src/app/models/task.model";
import { List } from "src/app/models/list.model";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-task-view",
  templateUrl: "./task-view.component.html",
  styleUrls: ["./task-view.component.scss"],
})
export class TaskViewComponent implements OnInit {
  title: string;
  amount: number;
  lists: List[];
  tasks: Task[];
  selectedListId: string;
  gotTasksData: Task[];
  sumOfAmount: number = 0;
  viewTotal: boolean = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  //

  //
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        this.selectedListId = params.listId;
        this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
          this.sumOfAmount = 0;
          if (this.tasks.length == 0) {
            this.viewTotal = false;
          } else {
            this.viewTotal = true;
          }
          this.tasks.forEach((data) => {
            this.sumOfAmount = this.sumOfAmount + data.amount;
          });
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
    });
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(["/lists"]);
      console.log(res);
    });
  }

  onDeleteTaskClick(id: string) {
    this.taskService
      .deleteTask(this.selectedListId, id)
      .subscribe((res: any) => {
        this.tasks = this.tasks.filter((val) => val._id !== id);
        console.log(res);
      });
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
