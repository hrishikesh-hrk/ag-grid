import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
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

  constructor(private appService: AppService, private cdr: ChangeDetectorRef) { }

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
        this.columnDefs = [
          {
            field: 'Request_ID',
            headerName: 'Request Id',
            filter: 'agNumberColumnFilter',
            width: 120
          },
          {
            field: 'Requester_Name',
            headerName: 'Requester Name',
            filter: 'agTextColumnFilter',
            minWidth: 150,
            flex: 1
          },
          {
            field: 'chosen_group',
            headerName: 'User Group',
            filter: 'agTextColumnFilter',
            minWidth: 250,
            wrapText: true,
            autoHeight: true,
            flex: 2
          },
          {
            field: 'approver_name',
            headerName: 'Approver Name',
            filter: 'agTextColumnFilter',
            minWidth: 150,
            flex: 1
          },
          {
            field: 'request_status',
            headerName: 'Request Status',
            filter: 'agTextColumnFilter',
            minWidth: 100,
            cellStyle: (params: any) => {
              if (params.value === 'APPROVED') return { color: 'green', fontWeight: '600' };
              if (params.value === 'REJECTED') return { color: 'red', fontWeight: '600' };
              return { color: '#444' };
            }
          },
          {
            field: 'accessProvided',
            headerName: 'Access Provided',
            filter: 'agTextColumnFilter',
            minWidth: 120,
            valueGetter: (p: any) =>
              p.data?.request_status === 'APPROVED' ? 'Yes' : 'No',
          },
          {
            field: 'updated_timestamp',
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

        this.gridData = res;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log("Error :", err)
      }
    })
  }
}
