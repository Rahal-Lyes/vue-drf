import {defineStore} from 'pinia';
export const useToastStore=defineStore('toast',{
  state:()=>({
    message:'',
    color:'success',
    timer:5000,
    icon:'fa-check-circle',
    show:false
  }) ,
  actions:{
    Toast(data){
      if(!data.message)return;
      this.message=data.message;
      this.color=data.color || 'success';
      this.timer=data.timer || 5000;
      this.icon=data.icon || 'fa-check-circle';
      this.show=true;

    },
    ToastError(data){
      this.Toast({
        ...data,
        color:'danger',
        icon:'fa-alert-circle'
      })

    },
ToastWarning(data){
      this.Toast({
        ...data,
        color:'warning',
        icon:'fa-alert'
      })
    },
    ToastSuccess(data){
      this.Toast({
        ...data,
        color:'success',
        icon:'fa-check-circle'
      })  
    }
  }

})