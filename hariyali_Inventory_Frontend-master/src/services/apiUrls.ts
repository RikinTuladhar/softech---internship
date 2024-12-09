import { mainApi } from "./apiHelper";

const apiUrls = {
  unit: {
    createUnit: {
      method: "POST",
      url: "/setup/unit/createUnit",
    },
    getUnit: {
      method: "GET",
      url: "/setup/unit/getUnit",
    },
    getUnitById: {
      method: "GET",
      url: "/setup/unit/getUnitById",
    },
    deletedUnittest: {
      method: "GET",
      url: "/setup/unit/deletedUnitList",
    },
    deleteUnit: {
      method: "DELETE",
      url: "/setup/unit/deleteUnit",
    },
  },
  fiscalYear: {
    createFiscalyear: {
      method: "POST",
      url: "/setup/fiscal/createFiscalYear",
    },
    getFiscalYear: {
      method: "GET",
      url: "/setup/fiscal/getFiscalYear",
    },
    getFiscalYearById: {
      method: "GET",
      url: "/setup/fiscal/getFiscalYearById",
    },
    deleteFiscalYear: {
      method: "DELETE",
      url: "/setup/fiscal/deleteFiscalYear",
    },
    updateActiveStatus: {
      method: "GET",
      url: "/setup/fiscal/updateActiveStatus",
    },
  },
  Bank: {
    createBank: {
      method: "POST",
      url: "/setup/bank/createBank",
    },
    getBank: {
      method: "GET",
      url: "/setup/bank/getBank",
    },
    getBankById: {
      method: "GET",
      url: "/setup/bank/getBankById",
    },
    deleteBank: {
      method: "DELETE",
      url: "/setup/bank/deleteBank",
    },
    editBank: {
      method: "PATCH",
      url: "/setup/bank/editBank",
    },
  },
  Vendor: {
    createVendor: {
      method: "POST",
      url: "/setup/vendor/createVendor",
    },
    getVendor: {
      method: "GET",
      url: "/setup/vendor/getVendor",
    },
    getVendorById: {
      method: "GET",
      url: "/setup/vendor/getVendorById",
    },
    deleteVendor: {
      method: "DELETE",
      url: "/setup/vendor/deleteVendor",
    },
  },
  MaterialType: {
    Newrequest: {
      method: "GET",
      url: "/setup/materialType/getMaterialType",
    },
  },
  MaterialCategory: {
    CreateMaterialCategory: {
      method: "POST",
      url: "/setup/materialCategory/createMaterialCategory",
    },
    GetMaterialCategory: {
      method: "GET",
      url: "/setup/materialCategory/getMaterialCategory",
    },
    GetMaterialbyType: {
      method: "GET",
      url: "/setup/materialCategory/getMaterialCategoryByTypeId",
    },
    GetMaterialCategoryById: {
      method: "GET",
      url: "/setup/materialCategory/getMaterialCategoryById",
    },
    deleteMaterialCategory: {
      method: "DELETE",
      url: "/setup/materialCategory/deleteMaterialCategory",
    },
  },
  MaterialSubCategory: {
    CreateSubCategory: {
      method: "POST",
      url: "/setup/materialSubCategory/createSubCategory",
    },
    GetSubCategory: {
      method: "GET",
      url: "/setup/materialSubCategory/getSubCategory",
    },
    GetSubCategoryByCategory: {
      method: "GET",
      url: "/setup/materialSubCategory/getSubCategoryByCategoryId",
    },
    GetSubCategoryById: {
      method: "GET",
      url: "/setup/materialSubCategory/getSubCategoryById",
    },
    deleteCategory: {
      method: "DELETE",
      url: "/setup/materialSubCategory/deleteSubCategory",
    },
  },
  Item: {
    CreateItem: {
      method: "POST",
      url: "/setup/item/createItem",
    },
    getAllItem: {
      method: "GET",
      url: "/setup/item/getAllItem",
    },
    GetItemBySubCategory: {
      method: "GET",
      url: "/setup/item/getItemBySubCategoryId",
    },
    GetItemById: {
      method: "GET",
      url: "/setup/item/getItemById",
    },
    deleteItem: {
      method: "DELETE",
      url: "/setup/item/deleteItem",
    },
  },
  User: {
    registerUser: {
      method: "POST",
      url: "/user/registerUser",
    },
    Login: {
      method: "POST",
      url: "/user/loginUser",
    },
    Userme: {
      method: "GET",
      url: "/user/userMe",
    },
    NameList: {
      method: "GET",
      url: "/user/userList",
    },
    EmailList: {
      method: "GET",
      url: "/user/userEmailList",
    },
  },
  Office: {
    GetState: {
      method: "GET",
      url: "/office/getstate",
    },
    GetDistrict: {
      method: "GET",
      url: "/office/getdistrict",
    },
    GetPalika: {
      method: "GET",
      url: "/office/getpalika",
    },
    GetAllPalika: {
      method: "GET",
      url: "/office/getAllPalika",
    },
    GetAllDistrict: {
      method: "GET",
      url: "/office/getAllDistrict",
    },
    companyDepartment: {
      create: {
        method: "POST",
        url: "/office/department/createDepartment",
      },
      get: {
        method: "GET",
        url: "/office/department/getDepartment",
      },
      getById: {
        method: "GET",
        url: "/office/department/getDepartmentById",
      },
      deleteDepartment: {
        method: "DELETE",
        url: "/office/department/deleteDepartment",
      },
    },
    companyPost: {
      createPost: {
        method: "POST",
        url: "/office/post/createPost",
      },
      getPost: {
        method: "GET",
        url: "/office/post/getPost",
      },
      getPostById: {
        method: "GET",
        url: "/office/post/getPostById",
      },
      getPostByDepartmentId: {
        method: "GET",
        url: "/office/post/getPostByDepartmentId",
      },
      deletePost: {
        method: "DELETE",
        url: "/office/post/deletePost",
      },
    },
    companyEmployee: {
      createEmployee: {
        method: "POST",
        url: "/office/employee/createCompanyEmployee",
      },
    },
  },
  stock: {
    openingStock: {
      create: {
        method: "POST",
        url: "/stock/openingStock/createOpeningStock",
      },
      list: {
        method: "GET",
        url: "/stock/openingStock/getOpeningStockList",
      },

      getPriceList: {
        method: "GET",
        url: "/stock/priceListByItem",
      },
      getRemainingStock: {
        method: "GET",
        url: "/stock/getRemainingQuantity",
      },
      listProject: {
        method: "GET",
        url: "/stock/openingStock/getOpeningStockListProject",
      },

      getPriceListProject: {
        method: "GET",
        url: "/stock/priceListByItemByProjectStock",
      },
      getRemainingStockProject: {
        method: "GET",
        url: "/stock/getRemainingQuantityByProjectStock",
      },
      listGroup: {
        method: "GET",
        url: "/stock/openingStock/getOpeningStockListGroup",
      },
      getPriceListGroup: {
        method: "GET",
        url: "/stock/priceListByItemByGroupStock",
      },
      getRemainingStockGroup: {
        method: "GET",
        url: "/stock/getRemainingQuantityByGroupStock",
      },
    },
  },
  vehicle: {
    company: {
      createCompany: {
        method: "POST",
        url: "/vehicle/company/createCompany",
      },
      getCompany: {
        method: "GET",
        url: "/vehicle/company/getCompany",
      },
      getCompanyById: {
        method: "GET",
        url: "/vehicle/company/getCompanyById",
      },
      deleteCompany: {
        method: "DELETE",
        url: "/vehicle/company/deleteCompany",
      },
    },
    type: {
      createType: {
        method: "POST",
        url: "/vehicle/type/createType",
      },
      getType: {
        method: "GET",
        url: "/vehicle/type/getVehicleType",
      },
      getTypeById: {
        method: "GET",
        url: "/vehicle/type/getVehicleTypeById",
      },
      deleteType: {
        method: "DELETE",
        url: "/vehicle/type/deleteVehicleType",
      },
    },
    use: {
      createUse: {
        method: "POST",
        url: "/vehicle/use/createVehicleUse",
      },
      getVehicleUse: {
        method: "GET",
        url: "/vehicle/use/getVehicleUse",
      },
      getVehicleUseById: {
        method: "GET",
        url: "/vehicle/use/getVehicleUseById",
      },
      deleteVehicleUse: {
        method: "DELETE",
        url: "/vehicle/use/deleteVehicleUse",
      },
    },
    category: {
      createVehicleCategory: {
        method: "POST",
        url: "/vehicle/category/createVehicleCategory",
      },
      getVehicleCategory: {
        method: "GET",
        url: "/vehicle/category/getVehicleCategory",
      },
      getVehicleCategoryById: {
        method: "GET",
        url: "/vehicle/category/getVehicleCategoryById",
      },
      deleteVehicleCategory: {
        method: "DELETE",
        url: "/vehicle/category/deleteVehicleCategory",
      },
    },
    vehicle: {
      createVehicle: {
        method: "POST",
        url: "/vehicle/createVehicle",
      },
      getAllVehicle: {
        method: "GET",
        url: "/vehicle/getVehicle",
      },
      getVehicleById: {
        method: "GET",
        url: "/vehicle/getVehicleById",
      },
      deleteVehicle: {
        method: "DELETE",
        url: "/vehicle/deleteVehicle",
      },
    },
  },
  hariyaliProject: {
    createHariyaliProject: {
      method: "POST",
      url: "/project/createProject",
    },
    getHariyaliProject: {
      method: "GET",
      url: "/project/getHariyaliProject",
    },
    getHariyaliProjectById: {
      method: "GET",
      url: "/project/getHariyaliProjectById",
    },
    deleteHariyaliProject: {
      method: "DELETE",
      url: "/project/deleteHariyaliProject",
    },
    materialType: {
      method: "GET",
      url: "/project/getMaterialTypeByProjectStock",
    },
    categoryList: {
      method: "GET",
      url: "/project/getMaterialCategoryByProjectStock",
    },
    subCategoryList: {
      method: "GET",
      url: "/project/getSubMaterialCategoryByProjectStock",
    },
    itemList: {
      method: "GET",
      url: "/project/getItemByProjectStock",
    },
  },
  businessManager: {
    CreateBusinessManager: {
      method: "POST",
      url: "/businessManager/createBusinessManager",
    },
    GetBusinessManager: {
      method: "GET",
      url: "/businessManager/getBusinessManager",
    },
    GetBusinessManagerById: {
      method: "GET",
      url: "/businessManager/getBusinessManagerById",
    },
    DeleteBusinessManager: {
      method: "DELETE",
      url: "/businessManager/deleteBusinessManager",
    },
    GetManagerByProjectId: {
      method: "GET",
      url: "/businessManager/getManagerByProjectId",
    },
  },
  farmerGroup: {
    createFarmerGroup: {
      method: "POST",
      url: "/farmerGroup/createFarmerGroup",
    },
    getFarmerGroup: {
      method: "GET",
      url: "/farmerGroup/getFarmerGroup",
    },
    getFarmerGroupById: {
      method: "GET",
      url: "/farmerGroup/getFarmerGroupById",
    },
    deleteFarmerGroup: {
      method: "DELETE",
      url: "/farmerGroup/deleteFarmerGroup",
    },
    changeStatus: {
      method: "PATCH",
      url: "/farmerGroup/updateFarmerGroupStatus",
    },
    getGroupByProject: {
      method: "GET",
      url: "/farmerGroup/getFarmerGroupByProject",
    },
    getType: {
      method: "GET",
      url: "/farmerGroup/farmerGroupMaterialType",
    },
    getCategory: {
      method: "GET",
      url: "/farmerGroup/farmerGroupMaterialCategory",
    },
    getSubCategory: {
      method: "GET",
      url: "/farmerGroup/farmerGroupMaterialSubCategory",
    },
    getItem: {
      method: "GET",
      url: "/farmerGroup/farmerGroupItem",
    },
    getFarmerGroupByProjectId: {
      method: "GET",
      url: "/farmerGroup/farmerGroupByProject",
    },
    getFarmerGroupByManagerId: {
      method: "GET",
      url: "/farmerGroup/farmerGroupByManager",
    },
  },
  farmer: {
    createrFarmer: {
      method: "POST",
      url: "/farmer/createFarmer",
    },
    getFarmer: {
      method: "GET",
      url: "/farmer/getFarmer",
    },
    getFarmerById: {
      method: "GET",
      url: "/farmer/getFarmerById",
    },
    deleteFarmer: {
      method: "DELETE",
      url: "/farmer/deleteFarmer",
    },
    updateFarmerStatus: {
      method: "PATCH",
      url: "/farmer/updateFarmerStatus",
    },
    farmerByGroupId: {
      method: "GET",
      url: "/farmer/getFarmerAccordingToGroup",
    },
    farmerByManager: {
      method: "GET",
      url: "/farmer/getFarmerByManager",
    },
    farmerByProject: {
      method: "GET",
      url: "/farmer/getFarmerByProject",
    },
  },
  request: {
    createRequest: {
      method: "POST",
      url: "/request/createRequest",
    },
    createRequestByProject: {
      method: "POST",
      url: "/request/createRequestByProject",
    },
    getRequestByFarmerGroup: {
      method: "GET",
      url: "/request/getRequestByFarmerGroup",
    },
    getRequestedItem: {
      method: "GET",
      url: "/request/getRequestedItem",
    },
    incommingRequestForProject: {
      method: "GET",
      url: "/request/projectIncommingRequest",
    },
    createGivenToProject: {
      method: "POST",
      url: "/request/createGivenToProject",
    },
    createGivenToGroup: {
      method: "POST",
      url: "/request/createGivenToGroup",
    },
    createGivenToFarmer: {
      method: "POST",
      url: "/request/createGivenToFarmer",
    },
    getRequestDoneByProject: {
      method: "GET",
      url: "/request/getRequestDoneByProject",
    },
    getInCommingRequestForCompany: {
      method: "GET",
      url: "/request/getIncommingRequestForCompany",
    },
    getRequestedItemByProject: {
      method: "GET",
      url: "/request/getRequestedItemByProject",
    },
    getGivenStockToGroup: {
      method: "GET",
      url: "/request/getGivenStockToGroup",
    },
    getGivenStockToFramer: {
      method: "GET",
      url: "/request/getGivenStockToFarmer",
    },
    getStockTakenByGroup: {
      method: "GET",
      url: "/request/getStockTakenByGroup",
    },
    getGivenItemsByProject: {
      method: "GET",
      url: "/request/givenItemByProject",
    },
    getGivenItemsByGroup: {
      method: "GET",
      url: "/request/givenItemByGroup",
    },
    getGivenItemsToProject: {
      method: "GET",
      url: "/request/givenItemsToProject",
    },
    getItemsGivenByCompany: {
      method: "GET",
      url: "/request/givenItemsToProjectByCompany",
    },
    getItemsTakenByProject: {
      method: "GET",
      url: "/request/takenByProjectFromCompany",
    },
    getComparisonRequestedItem: {
      method: "GET",
      url: "/request/getComparisonRequestedItem",
    },
    getGroupIdByRequestId: {
      method: "GET",
      url: "/request/getGroupIdByRequestId",
    },
    getComparisonRequestedItemByProject: {
      method: "GET",
      url: "/request/getComparisonRequestedItemByProject",
    },
    getProjectIdByRequestId: {
      method: "GET",
      url: "/request/getProjectIdByRequestId",
    },
  },
};

export default apiUrls;
