import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/addresses/address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  addresses: any[] = [];
  displayedColumns: string[] = ['id', 'street', 'city', 'actions'];
  constructor(private addressService: AddressService, private router: Router) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  addNewAddress(): void {
  this.router.navigate(['/addresses/add']); // Redirige vers la route de création
}


  loadAddresses(): void {
    this.addressService.getAddresses().subscribe(
      (data) => {
        this.addresses = data;
      },
      (error) => {
        console.error('Error loading addresses', error);
      }
    );
  }

  deleteAddress(id: number): void {
    this.addressService.deleteAddress(id).subscribe(
      () => {
        console.log('Address deleted successfully');
        this.loadAddresses(); // Rafraîchir la liste après suppression
      },
      (error) => {
        console.error('Error deleting address', error);
      }
    );
  }
  editAddress(id: number): void {
    this.router.navigate(['/addresses/edit', id]); // Rediriger vers le formulaire d'édition
  }
}
