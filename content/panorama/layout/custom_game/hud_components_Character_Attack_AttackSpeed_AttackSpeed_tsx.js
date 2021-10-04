{

/***/ "./hud/components/Character/Attack/AttackSpeed/AttackSpeed.tsx":
/*!*********************************************************************!*\
  !*** ./hud/components/Character/Attack/AttackSpeed/AttackSpeed.tsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../App */ "./hud/App.tsx");
/* harmony import */ var _hoc_ReactTimeout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../hoc/ReactTimeout */ "./hud/hoc/ReactTimeout.tsx");
/* harmony import */ var _Styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Styles */ "./hud/components/Character/Attack/Styles.ts");




const AttackSpeed = (props) => {
    // $.Msg("REACT-RENDER: Character - AttackSpeed rendered");
    const { selectedUnit, setInterval, clearInterval } = props;
    const [attackSpeed, setAttackSpeed] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Entities.GetAttackSpeed(selectedUnit));
    const [secondsPerAttack, setSecondsPerAttack] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Entities.GetSecondsPerAttack(selectedUnit));
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const id = setInterval(() => {
            setAttackSpeed(Entities.GetAttackSpeed(selectedUnit));
            setSecondsPerAttack(Entities.GetSecondsPerAttack(selectedUnit));
        }, _App__WEBPACK_IMPORTED_MODULE_1__.HUD_THINK_MEDIUM);
        return () => clearInterval(id);
    }, [selectedUnit, setInterval, clearInterval]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(Panel, { style: _Styles__WEBPACK_IMPORTED_MODULE_3__.Styles.Row() },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(Panel, { style: _Styles__WEBPACK_IMPORTED_MODULE_3__.Styles.LeftColumn() },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(Label, { text: 'Attack Speed:', style: _Styles__WEBPACK_IMPORTED_MODULE_3__.Styles.ColumnLabel() })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(Panel, { style: _Styles__WEBPACK_IMPORTED_MODULE_3__.Styles.RightColumn() },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(Label, { text: (attackSpeed * 100).toFixed(0) + " (" + (secondsPerAttack).toFixed(2) + 's)', style: _Styles__WEBPACK_IMPORTED_MODULE_3__.Styles.ColumnLabel() }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0__.memo((0,_hoc_ReactTimeout__WEBPACK_IMPORTED_MODULE_2__.default)(AttackSpeed)));


/***/ })

};