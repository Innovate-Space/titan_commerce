import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  menuLinks = [
    { link: '', name: 'Electronics' },
    { link: '', name: 'Jewelery' },
    { link: '', name: 'Men\'s Clothing' },
    { link: '', name: 'Women\s Clothing' }
  ]

  data = [
    'https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/w4-payday-deals/Pay_day_deals_Slider.jpg',
    'https://ng.jumia.is/cms/0-1-initiatives/jumia-pay/2023/Mall712x384.jpg',
    'https://ng.jumia.is/cms/0-1-initiatives/flashsale/new_712x384v2.png',
    'https://ng.jumia.is/cms/0-1-initiatives/jbps/updated-jbp-2022/adidas/homepage_slider.jpg',
    'https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/w3-fresh-start/cash/Slider.jpg',
    'https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/w3-fresh-start/Homepage_712x384_copy.jpg',
    'https://ng.jumia.is/cms/0-1-initiatives/vote-for-deals/2023/712x384.gif'
  ]

}
