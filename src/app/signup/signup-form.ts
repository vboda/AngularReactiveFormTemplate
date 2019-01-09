export class SignupForm{
  static userID: number;
    constructor(
        public userID:number,
        public firstName:string = '',
        public middleName:string='',
        public lastName:string='',
        public email:string='',
        public phoneNumber:number=null,
        public houseNumber:string='',
        public lane:string='',
        public area:string='',
        public country:string='',
        public city:string='',
        public state:string='',
        public zip:number=null
    ){}
}