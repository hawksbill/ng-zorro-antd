// tslint:disable:no-any
import { Component } from '@angular/core';

const provinces = [{
  value: 'zhejiang',
  label: 'Zhejiang'
}, {
  value: 'jiangsu',
  label: 'Jiangsu'
}];

const cities: { [ key: string ]: Array<{ value: string, label: string, isLeaf?: boolean }> } = {
  zhejiang: [{
    value: 'hangzhou',
    label: 'Hangzhou'
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    isLeaf: true
  }],
  jiangsu: [{
    value: 'nanjing',
    label: 'Nanjing'
  }]
};

const scenicspots: { [ key: string ]: Array<{ value: string, label: string, isLeaf?: boolean }> } = {
  hangzhou: [{
    value: 'xihu',
    label: 'West Lake',
    isLeaf: true
  }],
  nanjing: [{
    value: 'zhonghuamen',
    label: 'Zhong Hua Men',
    isLeaf: true
  }]
};

@Component({
  selector: 'nz-demo-cascader-default-value-and-lazyload',
  template: `
    <nz-cascader
      [(ngModel)]="values"
      [nzLoadData]="loadData"
      (ngModelChange)="onChanges($event)">
    </nz-cascader>
  `,
  styles  : [
    `
    .ant-cascader-picker {
      width: 300px;
    }
    `
  ]
})
export class NzDemoCascaderDefaultValueAndLazyloadComponent {
  values: any[] = ['zhejiang', 'hangzhou', 'xihu'];

  onChanges(values: any): void {
    console.log(values, this.values);
  }

  /** load data async execute by `nzLoadData` method */
  loadData(node: any, index: number): PromiseLike<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (index < 0) { // if index less than 0 it is root node
          node.children = provinces;
        } else if (index === 0) {
          node.children = cities[node.value];
        } else {
          node.children = scenicspots[node.value];
        }
        resolve();
      }, 1000);
    });
  }
}
