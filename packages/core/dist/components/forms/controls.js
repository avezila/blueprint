/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
// HACKHACK: these components should go in separate files
// tslint:disable max-classes-per-file
var classNames = require("classnames");
var React = require("react");
var props_1 = require("../../common/props");
var utils_1 = require("../../common/utils");
/** Base Component class for all Controls */
var Control = (function (_super) {
    __extends(Control, _super);
    function Control() {
        _super.apply(this, arguments);
    }
    // generates control markup for given input type.
    // optional inputRef in case the component needs reference for itself (don't forget to invoke the prop!).
    Control.prototype.renderControl = function (type, typeClassName, inputRef) {
        if (inputRef === void 0) { inputRef = this.props.inputRef; }
        return (React.createElement("label", {className: classNames("pt-control", typeClassName, this.props.className), style: this.props.style}, 
            React.createElement("input", __assign({}, props_1.removeNonHTMLProps(this.props, ["children"], true), {ref: inputRef, type: type})), 
            React.createElement("span", {className: "pt-control-indicator"}), 
            this.props.label, 
            this.props.children));
    };
    return Control;
}(React.Component));
exports.Control = Control;
var Checkbox = (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        var _this = this;
        _super.apply(this, arguments);
        this.handleInputRef = function (ref) {
            _this.input = ref;
            utils_1.safeInvoke(_this.props.inputRef, ref);
        };
    }
    Checkbox.prototype.render = function () {
        return this.renderControl("checkbox", "pt-checkbox", this.handleInputRef);
    };
    Checkbox.prototype.componentDidMount = function () {
        if (this.props.defaultIndeterminate != null) {
            this.input.indeterminate = this.props.defaultIndeterminate;
        }
        this.updateIndeterminate();
    };
    Checkbox.prototype.componentDidUpdate = function () {
        this.updateIndeterminate();
    };
    Checkbox.prototype.updateIndeterminate = function () {
        if (this.props.indeterminate != null) {
            this.input.indeterminate = this.props.indeterminate;
        }
    };
    Checkbox.displayName = "Blueprint.Checkbox";
    return Checkbox;
}(Control));
exports.Checkbox = Checkbox;
var Switch = (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        _super.apply(this, arguments);
    }
    Switch.prototype.render = function () {
        return this.renderControl("checkbox", "pt-switch");
    };
    Switch.displayName = "Blueprint.Switch";
    return Switch;
}(Control));
exports.Switch = Switch;
var Radio = (function (_super) {
    __extends(Radio, _super);
    function Radio() {
        _super.apply(this, arguments);
    }
    Radio.prototype.render = function () {
        return this.renderControl("radio", "pt-radio");
    };
    Radio.displayName = "Blueprint.Radio";
    return Radio;
}(Control));
exports.Radio = Radio;
exports.CheckboxFactory = React.createFactory(Checkbox);
exports.SwitchFactory = React.createFactory(Switch);
exports.RadioFactory = React.createFactory(Radio);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2Zvcm1zL2NvbnRyb2xzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7Ozs7O0FBRUgseURBQXlEO0FBQ3pELHNDQUFzQztBQUV0QyxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixzQkFBMkMsb0JBQW9CLENBQUMsQ0FBQTtBQUNoRSxzQkFBMkIsb0JBQW9CLENBQUMsQ0FBQTtBQXNCaEQsNENBQTRDO0FBQzVDO0lBQXNELDJCQUEwRDtJQUFoSDtRQUFzRCw4QkFBMEQ7SUFhaEgsQ0FBQztJQVpHLGlEQUFpRDtJQUNqRCx5R0FBeUc7SUFDL0YsK0JBQWEsR0FBdkIsVUFBd0IsSUFBMEIsRUFBRSxhQUFxQixFQUFFLFFBQThCO1FBQTlCLHdCQUE4QixHQUE5QixXQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUNyRyxNQUFNLENBQUMsQ0FDSCxxQkFBQyxLQUFLLElBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBTTtZQUNyRyxxQkFBQyxLQUFLLGdCQUFLLDBCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRSxHQUFHLEVBQUUsUUFBUyxFQUFDLElBQUksRUFBRSxJQUFLLEdBQUc7WUFDNUYscUJBQUMsSUFBSSxJQUFDLFNBQVMsRUFBQyxzQkFBc0IsRUFBRztZQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQU07WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTLENBQ2pCLENBQ1gsQ0FBQztJQUNOLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FiQSxBQWFDLENBYnFELEtBQUssQ0FBQyxTQUFTLEdBYXBFO0FBYlksZUFBTyxVQWFuQixDQUFBO0FBVUQ7SUFBOEIsNEJBQXVCO0lBQXJEO1FBQUEsaUJBK0JDO1FBL0I2Qiw4QkFBdUI7UUEyQnpDLG1CQUFjLEdBQUcsVUFBQyxHQUFxQjtZQUMzQyxLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNqQixrQkFBVSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUF6QlUseUJBQU0sR0FBYjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFTSxvQ0FBaUIsR0FBeEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVNLHFDQUFrQixHQUF6QjtRQUNJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTyxzQ0FBbUIsR0FBM0I7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3hELENBQUM7SUFDTCxDQUFDO0lBeEJhLG9CQUFXLEdBQUcsb0JBQW9CLENBQUM7SUE4QnJELGVBQUM7QUFBRCxDQS9CQSxBQStCQyxDQS9CNkIsT0FBTyxHQStCcEM7QUEvQlksZ0JBQVEsV0ErQnBCLENBQUE7QUFJRDtJQUE0QiwwQkFBcUI7SUFBakQ7UUFBNEIsOEJBQXFCO0lBTWpELENBQUM7SUFIVSx1QkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFKYSxrQkFBVyxHQUFHLGtCQUFrQixDQUFDO0lBS25ELGFBQUM7QUFBRCxDQU5BLEFBTUMsQ0FOMkIsT0FBTyxHQU1sQztBQU5ZLGNBQU0sU0FNbEIsQ0FBQTtBQUlEO0lBQTJCLHlCQUFvQjtJQUEvQztRQUEyQiw4QkFBb0I7SUFNL0MsQ0FBQztJQUhVLHNCQUFNLEdBQWI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUphLGlCQUFXLEdBQUcsaUJBQWlCLENBQUM7SUFLbEQsWUFBQztBQUFELENBTkEsQUFNQyxDQU4wQixPQUFPLEdBTWpDO0FBTlksYUFBSyxRQU1qQixDQUFBO0FBRVksdUJBQWUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELHFCQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QyxvQkFBWSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9mb3Jtcy9jb250cm9scy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuLy8gSEFDS0hBQ0s6IHRoZXNlIGNvbXBvbmVudHMgc2hvdWxkIGdvIGluIHNlcGFyYXRlIGZpbGVzXG4vLyB0c2xpbnQ6ZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZVxuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgSVByb3BzLCByZW1vdmVOb25IVE1MUHJvcHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Byb3BzXCI7XG5pbXBvcnQgeyBzYWZlSW52b2tlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb250cm9sUHJvcHMgZXh0ZW5kcyBJUHJvcHMge1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGNoZWNrZWQuICovXG4gICAgY2hlY2tlZD86IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBpbml0aWFsbHkgY2hlY2tlZCAodW5jb250cm9sbGVkKSAqL1xuICAgIGRlZmF1bHRDaGVja2VkPzogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIG5vbi1pbnRlcmFjdGl2ZS4gKi9cbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XG5cbiAgICAvKiogUmVmIGhhbmRsZXIgdGhhdCByZWNlaXZlcyBIVE1MIGA8aW5wdXQ+YCBlbGVtZW50IGJhY2tpbmcgdGhpcyBjb21wb25lbnQuICovXG4gICAgaW5wdXRSZWY/OiAocmVmOiBIVE1MSW5wdXRFbGVtZW50KSA9PiBhbnk7XG5cbiAgICAvKiogVGV4dCBsYWJlbCBmb3IgY29udHJvbC4gKi9cbiAgICBsYWJlbD86IHN0cmluZztcblxuICAgIC8qKiBFdmVudCBoYW5kbGVyIGludm9rZWQgd2hlbiBpbnB1dCB2YWx1ZSBpcyBjaGFuZ2VkICovXG4gICAgb25DaGFuZ2U/OiBSZWFjdC5Gb3JtRXZlbnRIYW5kbGVyPEhUTUxJbnB1dEVsZW1lbnQ+O1xufVxuXG4vKiogQmFzZSBDb21wb25lbnQgY2xhc3MgZm9yIGFsbCBDb250cm9scyAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2w8UCBleHRlbmRzIElDb250cm9sUHJvcHM+IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJlYWN0LkhUTUxQcm9wczxIVE1MSW5wdXRFbGVtZW50PiAmIFAsIHt9PiB7XG4gICAgLy8gZ2VuZXJhdGVzIGNvbnRyb2wgbWFya3VwIGZvciBnaXZlbiBpbnB1dCB0eXBlLlxuICAgIC8vIG9wdGlvbmFsIGlucHV0UmVmIGluIGNhc2UgdGhlIGNvbXBvbmVudCBuZWVkcyByZWZlcmVuY2UgZm9yIGl0c2VsZiAoZG9uJ3QgZm9yZ2V0IHRvIGludm9rZSB0aGUgcHJvcCEpLlxuICAgIHByb3RlY3RlZCByZW5kZXJDb250cm9sKHR5cGU6IFwiY2hlY2tib3hcIiB8IFwicmFkaW9cIiwgdHlwZUNsYXNzTmFtZTogc3RyaW5nLCBpbnB1dFJlZiA9IHRoaXMucHJvcHMuaW5wdXRSZWYpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJwdC1jb250cm9sXCIsIHR5cGVDbGFzc05hbWUsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4ucmVtb3ZlTm9uSFRNTFByb3BzKHRoaXMucHJvcHMsIFtcImNoaWxkcmVuXCJdLCB0cnVlKX0gcmVmPXtpbnB1dFJlZn0gdHlwZT17dHlwZX0gLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwdC1jb250cm9sLWluZGljYXRvclwiIC8+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ2hlY2tib3hQcm9wcyBleHRlbmRzIElDb250cm9sUHJvcHMge1xuICAgIC8qKiBXaGV0aGVyIHRoaXMgY2hlY2tib3ggaXMgaW5pdGlhbGx5IGluZGV0ZXJtaW5hdGUgKHVuY29udHJvbGxlZCkgKi9cbiAgICBkZWZhdWx0SW5kZXRlcm1pbmF0ZT86IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGlzIGNoZWNrYm94IGlzIGluZGV0ZXJtaW5hdGUgKi9cbiAgICBpbmRldGVybWluYXRlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgQ29udHJvbDxJQ2hlY2tib3hQcm9wcz4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5DaGVja2JveFwiO1xuXG4gICAgLy8gbXVzdCBtYWludGFpbiBpbnRlcm5hbCByZWZlcmVuY2UgZm9yIGBpbmRldGVybWluYXRlYCBzdXBwb3J0XG4gICAgcHJpdmF0ZSBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckNvbnRyb2woXCJjaGVja2JveFwiLCBcInB0LWNoZWNrYm94XCIsIHRoaXMuaGFuZGxlSW5wdXRSZWYpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGVmYXVsdEluZGV0ZXJtaW5hdGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5pbmRldGVybWluYXRlID0gdGhpcy5wcm9wcy5kZWZhdWx0SW5kZXRlcm1pbmF0ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUluZGV0ZXJtaW5hdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUluZGV0ZXJtaW5hdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUluZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5pbmRldGVybWluYXRlID0gdGhpcy5wcm9wcy5pbmRldGVybWluYXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVJbnB1dFJlZiA9IChyZWY6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dCA9IHJlZjtcbiAgICAgICAgc2FmZUludm9rZSh0aGlzLnByb3BzLmlucHV0UmVmLCByZWYpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU3dpdGNoUHJvcHMgZXh0ZW5kcyBJQ29udHJvbFByb3BzIHt9XG5cbmV4cG9ydCBjbGFzcyBTd2l0Y2ggZXh0ZW5kcyBDb250cm9sPElTd2l0Y2hQcm9wcz4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5Td2l0Y2hcIjtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckNvbnRyb2woXCJjaGVja2JveFwiLCBcInB0LXN3aXRjaFwiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJhZGlvUHJvcHMgZXh0ZW5kcyBJQ29udHJvbFByb3BzIHt9XG5cbmV4cG9ydCBjbGFzcyBSYWRpbyBleHRlbmRzIENvbnRyb2w8SVJhZGlvUHJvcHM+IHtcbiAgICBwdWJsaWMgc3RhdGljIGRpc3BsYXlOYW1lID0gXCJCbHVlcHJpbnQuUmFkaW9cIjtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckNvbnRyb2woXCJyYWRpb1wiLCBcInB0LXJhZGlvXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IENoZWNrYm94RmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoQ2hlY2tib3gpO1xuZXhwb3J0IGNvbnN0IFN3aXRjaEZhY3RvcnkgPSBSZWFjdC5jcmVhdGVGYWN0b3J5KFN3aXRjaCk7XG5leHBvcnQgY29uc3QgUmFkaW9GYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShSYWRpbyk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
