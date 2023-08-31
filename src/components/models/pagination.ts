export default class Pagination {
  public pageNumber: number;

  public pageSize: number;

  public offset: number;

  constructor(pageNumber: number = 0, pageSize: number = 16) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.offset = pageNumber * pageSize;
  }

  public nextPage(): Pagination {
    return new Pagination(this.pageNumber + 1, this.pageSize);
  }

  public prevPage(): Pagination {
    if (this.pageNumber < 1) {
      return new Pagination(0, this.pageSize);
    }
    return new Pagination(this.pageNumber - 1, this.pageSize);
  }
}

/**
 * TODO:: create test for the function below
 * @param offset
 * @param pageSize
 */
export function calculatePageNum(offset: number, pageSize: number): number {
  return Math.floor(offset / pageSize);
}
