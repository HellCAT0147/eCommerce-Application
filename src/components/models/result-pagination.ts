import Pagination from './pagination';

export default class ResultPagination<T> extends Pagination {
  public totalObjectsAmount: number;

  public paginationResult: Array<T>;

  constructor(paginationResult: Array<T>, totalObjectsAmount: number, pageNumber: number, pageSize: number) {
    super(pageNumber, pageSize);
    this.totalObjectsAmount = totalObjectsAmount;
    this.paginationResult = paginationResult;
  }
}
