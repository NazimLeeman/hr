import { AfterViewInit, Component, OnInit, NgModule } from '@angular/core';

declare const Square: any;

@Component({ 
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrl: './square.component.css'
})
export class SquareComponent implements AfterViewInit {
async ngAfterViewInit() {
    const payments = Square.payments('sandbox-sq0idb-RT3u-HhCpNdbMiGg5aXuVg', 'TC4Z3ZEBKRXRH');
    const card = await payments.card();
    await card.attach('#card-container');
  }

  async processPayment() {
    const card = Square.payments('sandbox-sq0idb-RT3u-HhCpNdbMiGg5aXuVg', 'TC4Z3ZEBKRXRH').card();
    const statusContainer = document.getElementById('payment-status-container');

    try {
      const result = await card.tokenize();
      if (result.status === 'OK') {
        console.log(`Payment token is ${result.token}`);
        if(statusContainer)
        statusContainer.innerHTML = "Payment Successful";
      } else {
        let errorMessage = `Tokenization failed with status: ${result.status}`;
        if (result.errors) {
          errorMessage += ` and errors: ${JSON.stringify(result.errors)}`;
        }
        throw new Error(errorMessage);
      }
    } catch (e) {
      console.error(e);
      if(statusContainer)
      statusContainer.innerHTML = "Payment Failed";
    }
  }
}
