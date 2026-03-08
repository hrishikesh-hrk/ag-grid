import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { PaginationNumberFormatterParams } from 'ag-grid-community';
// Angular component TS
import { themeBalham /* or themeQuartz, themeAlpine, themeMaterial */ } from 'ag-grid-community';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AgGridModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ag-grid');

  // AG Grid Variables
  gridOptions: any;
  columnDefs: any;
  gridData: any[] = [];
  gridApi: any;
  totalColumns: any;
  domLayout: any;
  paginationPageSize: any;
  paginationPageSizeSelector: any;
  paginationNumberFormatter: any;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.initializeAGGrid();
    this.getFileList();
  }



  initializeAGGrid() {
    this.gridOptions = {
      theme: 'legacy',
      rowHeight: 40,
      defaultColDef: {
        sortable: true,
        resizable: true,
        floatingFilter: true,
        wrapText: true,
        autoHeight: true
      },

      onGridReady: (params: any) => {
        this.gridApi = params.api;
      }
    }

    this.domLayout = "autoHeight";
    this.paginationPageSize = 10;
    this.paginationPageSizeSelector = [10, 50, 100];
    this.paginationNumberFormatter = (params: PaginationNumberFormatterParams): string => `[${params.value.toLocaleString()}]`
  }

  getFileList() {
    this.appService.getData().subscribe({
      next: (res: any) => {
        this.gridData = res;
      },
      error: (err: any) => {
        console.log("Error :", err)
      }
    })

    this.columnDefs = [
      {
        field: 'requestId',
        headerName: 'Request Id',
        filter: 'agNumberColumnFilter',
        width: 120
      },
      {
        field: 'userId',
        headerName: 'User Id',
        filter: 'agTextColumnFilter',
        minWidth: 150,
        flex: 1
      },
      {
        field: 'userGroup',
        headerName: 'User Group',
        filter: 'agTextColumnFilter',
        minWidth: 250,
        wrapText: true,
        autoHeight: true
      },
      {
        field: 'approverName',
        headerName: 'Approver Name',
        filter: 'agTextColumnFilter',
        minWidth: 150
      },
      {
        field: 'requestStatus',
        headerName: 'Request Status',
        filter: 'agTextColumnFilter',
        minWidth: 100,
        cellStyle: (params: any) => {
          if (params.value === 'Approved') return { color: 'green', fontWeight: '600' };
          if (params.value === 'Rejected') return { color: 'red', fontWeight: '600' };
          return { color: '#444' };
        }
      },
      {
        field: 'accessProvided',
        headerName: 'Access Provided',
        filter: 'agTextColumnFilter',
        minWidth: 100
      },
      {
        field: 'updatedDate',
        headerName: 'Updated Date',
        filter: 'agDateColumnFilter',
        minWidth: 180,
        valueFormatter: (params: any) => {
          if (!params.value) return '';
          const date = new Date(params.value);
          return date.toLocaleDateString('en-GB');
        }
      },
      {
        headerName: '',
        field: 'action',
        width: 80,
        sortable: false,
        filter: false,
        cellRenderer: () => `
      <i class="bi bi-box-arrow-up-right" style="cursor:pointer; font-size:18px;" aria-label="Open Request"></i>
    `,
        tooltipField: 'Open Request'
      }
    ];


    this.gridData = [
      {
        requestId: 1,
        userId: 'Current User',
        userGroup: 'Enterprise-Admin-Finance-FMC',
        approverName: 'User 1',
        requestStatus: 'Approved',
        accessProvided: 'Yes',
        updatedDate: '2026-05-17'
      },
      {
        requestId: 2,
        userId: 'Current User',
        userGroup: 'Read-Planning-FMC',
        approverName: 'User 2',
        requestStatus: 'Pending',
        accessProvided: '-',
        updatedDate: '2026-05-12'
      },
      {
        requestId: 3,
        userId: 'Current User',
        userGroup: 'Enterprise-Admin-HR-FMC',
        approverName: 'User 3',
        requestStatus: 'Rejected',
        accessProvided: '-',
        updatedDate: '2026-04-28'
      },
      {
        requestId: 4,
        userId: 'Current User',
        userGroup: 'Reporting-Admin-FMC',
        approverName: 'User 4',
        requestStatus: 'Approved',
        accessProvided: 'Yes',
        updatedDate: '2026-05-05'
      },
      {
        requestId: 5,
        userId: 'Current User',
        userGroup: 'Read-Analytics-FMC',
        approverName: 'User 5',
        requestStatus: 'Pending',
        accessProvided: '-',
        updatedDate: '2026-05-10'
      },
      {
        requestId: 6,
        userId: 'Current User',
        userGroup: 'Enterprise-Admin-Security-FMC',
        approverName: 'User 6',
        requestStatus: 'Approved',
        accessProvided: 'Yes',
        updatedDate: '2026-04-15'
      },
      {
        requestId: 7,
        userId: 'Current User',
        userGroup: 'Read-Compliance-FMC',
        approverName: 'User 7',
        requestStatus: 'Rejected',
        accessProvided: '-',
        updatedDate: '2026-03-30'
      },
      {
        requestId: 8,
        userId: 'Current User',
        userGroup: 'Enterprise-Admin-Operations-FMC',
        approverName: 'User 8',
        requestStatus: 'Approved',
        accessProvided: 'Yes',
        updatedDate: '2026-05-18'
      },
      {
        requestId: 9,
        userId: 'Current User',
        userGroup: 'Read-Planning-FMC',
        approverName: 'User 9',
        requestStatus: 'Pending',
        accessProvided: '-',
        updatedDate: '2026-05-08'
      },
      {
        requestId: 10,
        userId: 'Current User',
        userGroup: 'Enterprise-Admin-Finance-FMC',
        approverName: 'User 10',
        requestStatus: 'Approved',
        accessProvided: 'Yes',
        updatedDate: '2026-05-16'
      }
    ];
  }


}
