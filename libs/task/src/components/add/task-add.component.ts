import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddDialogComponent } from './task-add.dialog.component';
import { fromTask, TaskState } from '@labdat/task-state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Task } from '@labdat/data-models';
import { fromRouter } from '@labdat/router-state';

@Component({
  selector: 'app-task-add',
  template: ''
})
export class TaskAddComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;

  constructor(public dialog: MatDialog, private store: Store<TaskState>) { }

  ngOnInit(): void {
    setTimeout(() => {
      const dialogRef = this.dialog.open(TaskAddDialogComponent, {
        width: '700px'
      });

      const closeDialogSubscription = dialogRef
      .afterClosed()
      .subscribe((taskModel: Task) => {
        if (taskModel) {
          this.store.dispatch(new fromTask.Add({ task: taskModel }));
        }
        this.store.dispatch(new fromRouter.Back());
      });
      this.subscriptions = closeDialogSubscription;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}