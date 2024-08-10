import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { List } from 'src/app/models/list';
import { TaskService } from 'task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  addListForm: FormGroup;
  editListForm: FormGroup;
  columnDefs: { headerName: string; field: string; width: number; sortingOrder: string[]; headerTooltip: string; }[];
  constructor(private fb: FormBuilder, private router: Router, private taskService: TaskService) {

    this.addListForm = this.fb.group({
      UserEnteredSpecId: ["", Validators.compose([Validators.required])],
    });
    this.editListForm = this.fb.group({
      UserEnteredSpecId: ["", Validators.compose([Validators.required])],
    });

    this.columnDefs = [
      {
        headerName: "Spec ID",
        field: "UserEnteredSpecId",
        width: 80,
        sortingOrder: ["asc", "desc"],
        headerTooltip: "Spec ID",
      },
    ]
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe((list: List) => {
      console.log(list);
      // Now we navigate to /lists/task._id
      this.router.navigate([ '/lists', list._id ]);
    });
  }


  ngOnInit() {
  }

}
