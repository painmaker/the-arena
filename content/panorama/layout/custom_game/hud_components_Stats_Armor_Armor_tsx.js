{

/***/ "./hud/components/Stats/Armor/Armor.tsx":
/*!**********************************************!*\
  !*** ./hud/components/Stats/Armor/Armor.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _Styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Styles */ "./hud/components/Stats/Armor/Styles.tsx");
/* harmony import */ var _Styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Styles */ "./hud/components/Stats/Styles.tsx");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../App */ "./hud/App.tsx");
/* harmony import */ var _utils_Schedule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/Schedule */ "./hud/utils/Schedule.ts");





const Armor = (props) => {
    // $.Msg("REACT-RENDER: Stats - Armor rendered");
    const { selectedUnit } = props;
    const [armor, setArmor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Entities.GetPhysicalArmorValue(selectedUnit));
    const [bonusArmor, setBonusArmor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Entities.GetBonusPhysicalArmor(selectedUnit));
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        let schedule = -1;
        const update = () => {
            setArmor(Entities.GetPhysicalArmorValue(selectedUnit));
            setBonusArmor(Entities.GetBonusPhysicalArmor(selectedUnit));
            schedule = $.Schedule(_App__WEBPACK_IMPORTED_MODULE_3__.SCHEDULE_THINK_MEDIUM, update);
        };
        update();
        return () => (0,_utils_Schedule__WEBPACK_IMPORTED_MODULE_4__.cancelSchedule)(schedule, Armor.name);
    }, [selectedUnit]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(Panel, { style: _Styles__WEBPACK_IMPORTED_MODULE_2__.Styles.Entry() },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(Panel, { style: _Styles__WEBPACK_IMPORTED_MODULE_1__.Styles.Image() }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(Label, { style: _Styles__WEBPACK_IMPORTED_MODULE_2__.Styles.Label(), text: (armor - bonusArmor).toFixed(1) }),
        bonusArmor !== 0 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(Label, { style: { color: bonusArmor > 0 ? 'rgba(0, 128, 0, 0.75)' : 'rgba(175, 0, 0, 0.75)' }, text: (bonusArmor > 0 ? "+" : "") + "(" + bonusArmor.toFixed(1) + ")" }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0__.memo(Armor));


/***/ }),

/***/ "./hud/components/Stats/Armor/Styles.tsx":
/*!***********************************************!*\
  !*** ./hud/components/Stats/Armor/Styles.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Styles": () => (/* binding */ Styles)
/* harmony export */ });
/* harmony import */ var _Styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Styles */ "./hud/components/Stats/Styles.tsx");

const Styles = {
    Image: () => (Object.assign(Object.assign({}, _Styles__WEBPACK_IMPORTED_MODULE_0__.Styles.Image()), { backgroundImage: 'url("s2r://panorama/images/icon_armor.png")' })),
};


/***/ })

};