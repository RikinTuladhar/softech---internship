export type SideNavItem = {
  title: string;
  path: string;
  project?: Boolean;
  businessManager?: Boolean;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  farmerGroup?: Boolean;
  farmer?: Boolean;
};

export type SideNavItemGroup = {
  title: string;
  menuList: SideNavItem[];
};

export type UnitType = {
  id: number;
  name: string;
  symbol: string;
  isDeleted: Boolean;
};

export type SubCategory = {
  id: number;
  name: string;
  materialCategoryId: number;
  materialCategory: Category;
  isDeleted: Boolean;
  materialTypeId: number;
};
export type MaterialType = {
  id: number;
  name: string;
  isDeleted: Boolean;
};

export type Category = {
  id: number;
  name: string;
  materialTypeId: number;
  materialType: MaterialType;
  isDeleted: Boolean;
};

export type Item = {
  id: number;
  materialTypeId: number;
  materialCategoryId: number;
  materialSubCategoryId: number;
  name: string;
  unitId: number;
  specification: string;
  isDeleted: Boolean;
  materialSubCategory: SubCategory;
  materialCategory: Category;
  materialType: MaterialType;
  unit: UnitType;
};

export type State = {
  StateId: number;
  StateName: string;
  StateNameNep: string;
  StateCode: null;
};
export type District = {
  DistrictId: number;
  DistrictName: string;
  DistrictNameNep: string;
  StateId: number;
};
export type Palika = {
  PalikaId: number;
  DistricId: number;
  PalikaName: string;
  PalikaNameNep: string;
};
export type Bank = {
  id: number;
  bankName: string;
  isDeleted: Boolean;
};

export type Vendor = {
  id: number;
  fiscalYearId: number;
  vendorName: string;
  pan_vat: string;
  vendorState: number;
  vendorDistrict: number;
  vendorPalika: number;
  vendorWard: string;
  vendorTole: string;
  vendorHouseNo: string;
  contactPersonName: string;
  contactPersonPhoneNo: string;
  contactPersonDetails: string;
  isDeleted: Boolean;
  State: State;
  District: District;
  Palika: Palika;
  vendorContact: string;
};

export type FiscalYear = {
  id: number;
  fiscalYearName: string;
  startYear: string;
  endYear: string;
  startDate: string;
  endDate: string;
  status: Boolean;
  isDeleted: Boolean;
};

export type Company = {
  id: number;
  name: string;
  isDeleted: Boolean;
};

export type Vehicle = {
  id: number;
  companyId: number;
  typeId: number;
  useId: number;
  categoryId: number;
  vehicleNumber: string;
  regNo: string;
  engineNumber: string;
  chiyaciNumber: string;
  model: string;
  purchaseDate: string;
  receiveDate: string;
  BlueBookRenew: string;
  company: Company;
  type: Company;
  category: Company;
  use: Company;
  isDeleted: Boolean;
};
export type HariyaliProject = {
  id: string;
  name: string;
  fiscalYearId: number;
  userId: string;
  chiefName: string;
  email: string;
  contactNumber: string;
  vat_pan: string;
  stateId: number;
  districtId: number;
  palikaId: number;
  ward: string;
  tole: string;
  houseNo: number;
  bankId: number;
  accountNumber: string;
  role: string;
  isActive: Boolean;
  isDeleted: Boolean;
};

export type BusinessManager = {
  id: string;
  projectId: string;
  businessManagerName: string;
  contactNo: string;
  email: string;
  pan_vat: string;
  stateId: number;
  districtId: number;
  palikaId: number;
  wardNo: string;
  tole: string;
  houseno: string;
  bankId: number;
  accountNo: string;
  isActive: Boolean;
  isDeleted: Boolean;
};
export type FarmerGroup = {
  id: string;
  userId: string;
  fiscalYearId: number;
  projectId: string;
  managerId: string;
  groupName: string;
  contactNo: string;
  email: string;
  pan_vat: string;
  stateId: number;
  districtId: number;
  palikaId: number;
  ward: string;
  tole: string;
  houseNo: string;
  bankId: number;
  accountNo: string;
  isActive: Boolean;
  isDeleted: Boolean;
  projectName: string;
  businessManagerName: string;
};
export type Farmer = {
  id: string;
  userId: string;
  fiscalYearId: number;
  businessManagerId: string;
  hariyaliProjectId: string;
  farmarGroupId: string;
  farmarName: string;
  contactNumber: string;
  email: string;
  pan_vat: string;
  stateId: number;
  districtId: number;
  palikaId: number;
  ward: string;
  tole: string;
  houseNo: string;
  areaInsqkm: number;
  lat: string;
  long: string;
  bankId: number;
  accountNo: string;
  isActive: Boolean;
  isDeleted: Boolean;
  groupName: string;
  managerName: string;
  projectName: string;
};

export type StockList = {
  id: number;
  fiscalYearId: number;
  materialSubCategoryId: number;
  materialCategoryId: number;
  materialTypeId: number;
  quantity: number;
  remaining: number;
  isDeleted: Boolean;
  typeName: string;
  categoryName: string;
  subCategoryName: string;
  itemName: string;
};

export type Request = {
  id: number;
  userId: string;
  fiscalYearId: number;
  companyId: string;
  projectId: string;
  groupId: string;
  requestDate: string;
  requestedBy: string;
  requestItem: RequestItem[];
  isDeleted: Boolean;
  projectName: string;
  groupName: string;
  requestedItemNumber: number;
  isApproved: Boolean;
  isPartial: Boolean;
};
export type RequestForCompany = {
  id: number;
  userId: string;
  fiscalYearId: number;
  companyId: string;
  projectId: string;

  requestDate: string;
  requestedBy: string;

  isDeleted: Boolean;
  projectName: string;
  companyName: string;
  requestedItemNumber: number;
  isApproved: Boolean;
};
export type RequestItem = {
  id: number;
  requestId: number;
  typeId: number;
  categoryId: number | string;
  subCategoryId: number | string;
  itemId: number | string;
  quantity: number;
  specification: string;
  description: string;
  typeName: string;
  categoryName: string;
  subCategoryName: string;
  itemName: string;
  isFullFilled: Boolean;
};

export type requestItemType = {
  typeId: number;
  categoryId: string;
  subCategoryId: string;
  itemId: string;
};

export type rateListType = {
  vat: Boolean;
  rate: number;
  expDate: string;
};

export type GivenToGroupType = {
  id: number;
  projectId: string;
  userId: string;
  fiscalYearId: number;
  givenDate: string;
  isDeleted: Boolean;
  itemNumber: number;
  isCash: Boolean;
  isCredit: Boolean;
  isBoth: Boolean;
  cashAmount: number;
  creditAmount: number;
  totalPrice: number;
  projectName: string;
  farmarGroupId: string;
  farmerGroupName: string;
  paymentMethod: string;
};
export type GivenToFarmerType = {
  id: number;
  userId: string;
  fiscalYearId: number;
  givenDate: string;
  isDeleted: Boolean;
  itemNumber: number;
  isCash: Boolean;
  isCredit: Boolean;
  isBoth: Boolean;
  cashAmount: number;
  creditAmount: number;
  totalPrice: number;
  projectName: string;
  farmarGroupId: string;
  groupName: string;
  farmerName: string;
  paymentMethod: string;
};

export type GivenToProjectType = {
  id: number;
  projectId: string;
  userId: string;
  fiscalYearId: number;
  givenDate: string;
  isDeleted: Boolean;
  itemNumber: number;
  isCash: Boolean;
  isCredit: Boolean;
  isBoth: Boolean;
  cashAmount: number;
  creditAmount: number;
  totalPrice: number;
  projectName: string;
  companyName: string;
  paymentMethod: string;
};

export type ItemsGivenToGroupType = {
  id: number;
  givenId: number;
  typeId: number;
  categoryId: number;
  subCategoryId: number;
  itemId: number;
  rate: number;
  quantity: number;
  percentage: number;
  rateWithProfit: number;
  finalPrice: number;
  typeName: string;
  categoryName: string;
  subCategoryName: string;
  itemName: string;
};

export type compairedItemType = {
  id: number;
  requesteId: number;
  typeId: number;
  categoryId: number;
  subCategoryId: number;
  itemId: number;
  quantity: number;
  specification: string;
  description: string;
  typeName: string;
  categoryName: string;
  subCategoryName: string;
  itemName: string;
  remainingQuantity: number;
  expDate: string;
};

export type InStockItem = {
  id: number;
  fiscalYearId: number;
  projectId: string;
  itemId: number;
  materialSubCategoryId: number;
  materialCategoryId: number;
  materialTypeId: number;
  rate: number;
  price: number;
  purchaseDate: string; // assuming a date in string format
  userId: string;
  expDate: string; // assuming a date in string format
  quantity: number;
  remaining: number;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  takenQuantity: number;
  remainingAfterTake: number;
};

export type OutOfStockItem = {
  id: number;
  requestId: number;
  typeId: number;
  categoryId: number;
  subCategoryId: number;
  itemId: number;
  quantity: number;
  givenQuantity: number;
  specification: string;
  description: string;
  typeName: string;
  categoryName: string;
  subCategoryName: string;
  itemName: string;
  availableQuantity?: number; // Optional if it may not always be present
  fulfilledQuantity?: number; // Optional if it may not always be present
};

export type CompanyDepartmentType = {
  departmentId: number;
  departmentName: string;
  userId: string;
  companyId: string;
  fiscalYearId: number;
  isDeleted: Boolean;
  userName: string;
  companyName: string;
};

export type CompanyPostType = {
  postId: number;
  departmentId: number;
  postName: string;
  userId: string;
  companyId: string;
  isDeleted: Boolean;
  fiscalYearId: number;
  companyName: string;
  departmentName: string;
};
