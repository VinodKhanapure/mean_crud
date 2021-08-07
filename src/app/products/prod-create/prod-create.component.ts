import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ProdService } from '../prod.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-prod-create',
  templateUrl: './prod-create.component.html',
  styleUrls: ['./prod-create.component.css']
})

export class ProdCreateComponent implements OnInit {

  prodForm: FormGroup
  prodId: any
  prod: any
  mode: string = 'create'
  isLoading = false


  constructor(private fb: FormBuilder,
    private prodService: ProdService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.prodForm = this.fb.group({
      name: [null, Validators.required],
      cost: [null, Validators.required],


    })

    this.route.paramMap.subscribe((params: any) => {
      console.log("params",params)
      this.isLoading = false
      this.prodId = params.params.prodId
      console.log("@@@22",this.prodId)
    })

    if (this.prodId) {
      this.mode = 'edit'
      console.log("edit")
      this.isLoading = true
      this.prodService.getProdById(this.prodId).subscribe((prodData: any) => {
        console.log("prodData",prodData)
        this.isLoading = false
        this.prod = {
          name: prodData.prod.name,
          cost: prodData.prod.cost,

        }
        console.log("prodById", this.prod);


        this.prodForm.setValue({
          name: this.prod.name,
          cost: this.prod.cost,

        })

      })
    }
    else {
      this.mode = 'create'
    }

  }

  get f() {
    return this.prodForm.controls
  }

  onSaveProd() {
    console.log("prodForm", this.prodForm)

    if (this.prodForm.invalid) {
      return;
    }

    const {name,cost} = this.prodForm.value;

    console.log("name cost",name,cost)

    this.isLoading = true
    if (this.mode == 'create') {
      console.log("createProd")
      this.prodService.addProd(name,cost)
        .subscribe((res: any) => {
          this.isLoading = false;
          this.snackBar.open(res.message, "Create", { duration: 2000 })
          console.log("prodResponse", res)
          this.router.navigate([''])

        })

    }

    else {
      console.log("updateProd",name, cost,  this.prodId)
      this.prodService.updateProd(name, cost,  this.prodId)
        .subscribe((updateRes: any) => {
          this.isLoading = false
          this.snackBar.open(updateRes.message, "update", {
            duration: 3000
          }

          );
          console.log("updateRes", updateRes)
          this.router.navigate([''])
        })

    }

    // window.location.relo  +-ad()

    this.prodForm.reset()




  }

  // PickedImage(event: any) {
  //   const file = (event.target as HTMLInputElement).files[0]
  //   console.log("file", file)
  //   this.postForm.patchValue({ image: file })
  //   const file1 = this.postForm.get('image').updateValueAndValidity()
  //   const reader = new FileReader()
  //   reader.onload = () => {
  //     this.pickedImage = reader.result as string;
  //     console.log("pickedImage", this.pickedImage)


  //   }
  //   reader.readAsDataURL(file)
  // }

}

























































