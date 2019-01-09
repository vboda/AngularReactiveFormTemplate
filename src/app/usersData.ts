import {InMemoryDbService} from 'angular-in-memory-web-api'
import { Injectable } from '@angular/core';
import { SignupForm } from './signup/signup-form';
@Injectable({
    providedIn: 'root'
})

export class UsersData implements InMemoryDbService{
    createDb(){
        let users:SignupForm[]=  [
           
        ]

        return {users}
    }

    genId(users: UsersData[]): number {
        return users.length > 0 ? Math.max(...users.map(user =>user["id"])) + 1 : 1;
      }
}