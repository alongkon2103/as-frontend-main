"use client";

export interface InitialState {
  [key: string]: any;
}

export interface PaginationMetadata {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
