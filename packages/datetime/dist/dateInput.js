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
var classNames = require("classnames");
var moment = require("moment");
var React = require("react");
var core_1 = require("@blueprintjs/core");
var datePicker_1 = require("./datePicker");
var datePickerCore_1 = require("./datePickerCore");
var DateInput = (function (_super) {
    __extends(DateInput, _super);
    function DateInput(props, context) {
        var _this = this;
        _super.call(this, props, context);
        this.displayName = "Blueprint.DateInput";
        this.inputRef = null;
        this.getDateString = function (value) {
            if (_this.isNull(value)) {
                return "";
            }
            if (value.isValid()) {
                if (_this.dateIsInRange(value)) {
                    return value.format(_this.props.format);
                }
                else {
                    return _this.props.outOfRangeMessage;
                }
            }
            return _this.props.invalidDateMessage;
        };
        this.handleClosePopover = function () {
            _this.setState({ isOpen: false });
        };
        this.handleDateChange = function (date, hasUserManuallySelectedDate) {
            var momentDate = _this.fromDateToMoment(date);
            var hasMonthChanged = date !== null && !_this.isNull(_this.state.value) && _this.state.value.isValid() &&
                momentDate.month() !== _this.state.value.month();
            var isOpen = !(_this.props.closeOnSelection && hasUserManuallySelectedDate && !hasMonthChanged);
            if (_this.props.value === undefined) {
                _this.setState({ isInputFocused: false, isOpen: isOpen, value: momentDate });
            }
            else {
                _this.setState({ isInputFocused: false, isOpen: isOpen });
            }
            core_1.Utils.safeInvoke(_this.props.onChange, _this.fromMomentToDate(momentDate));
        };
        this.handleIconClick = function (e) {
            if (_this.state.isOpen) {
                if (_this.inputRef != null) {
                    _this.inputRef.blur();
                }
            }
            else {
                _this.setState({ isOpen: true });
                e.stopPropagation();
                if (_this.inputRef != null) {
                    _this.inputRef.focus();
                }
            }
        };
        this.handleInputFocus = function () {
            var valueString = _this.isNull(_this.state.value) ? "" : _this.state.value.format(_this.props.format);
            if (_this.props.openOnFocus) {
                _this.setState({ isInputFocused: true, isOpen: true, valueString: valueString });
            }
            else {
                _this.setState({ isInputFocused: true, valueString: valueString });
            }
        };
        this.handleInputClick = function (e) {
            if (_this.props.openOnFocus) {
                e.stopPropagation();
            }
        };
        this.handleInputChange = function (e) {
            var valueString = e.target.value;
            var value = moment(valueString, _this.props.format);
            if (value.isValid() && _this.dateIsInRange(value)) {
                if (_this.props.value === undefined) {
                    _this.setState({ value: value, valueString: valueString });
                }
                else {
                    _this.setState({ valueString: valueString });
                }
                core_1.Utils.safeInvoke(_this.props.onChange, _this.fromMomentToDate(value));
            }
            else {
                _this.setState({ valueString: valueString });
            }
        };
        this.handleInputBlur = function () {
            var valueString = _this.state.valueString;
            var value = moment(valueString, _this.props.format);
            if (valueString.length > 0
                && valueString !== _this.getDateString(_this.state.value)
                && (!value.isValid() || !_this.dateIsInRange(value))) {
                if (_this.props.value === undefined) {
                    _this.setState({ isInputFocused: false, value: value, valueString: null });
                }
                else {
                    _this.setState({ isInputFocused: false });
                }
                if (!value.isValid()) {
                    core_1.Utils.safeInvoke(_this.props.onError, new Date(undefined));
                }
                else if (!_this.dateIsInRange(value)) {
                    core_1.Utils.safeInvoke(_this.props.onError, _this.fromMomentToDate(value));
                }
                else {
                    core_1.Utils.safeInvoke(_this.props.onChange, _this.fromMomentToDate(value));
                }
            }
            else {
                if (valueString.length === 0) {
                    _this.setState({ isInputFocused: false, value: moment(null), valueString: null });
                }
                else {
                    _this.setState({ isInputFocused: false });
                }
            }
        };
        this.setInputRef = function (el) {
            _this.inputRef = el;
        };
        /**
         * Translate a moment into a Date object, adjusting the moment timezone into the local one.
         * This is a no-op unless moment-timezone's setDefault has been called.
         */
        this.fromMomentToDate = function (momentDate) {
            if (momentDate == null) {
                return undefined;
            }
            else {
                return new Date(momentDate.year(), momentDate.month(), momentDate.date(), momentDate.hours(), momentDate.minutes(), momentDate.seconds(), momentDate.milliseconds());
            }
        };
        /**
         * Translate a Date object into a moment, adjusting the local timezone into the moment one.
         * This is a no-op unless moment-timezone's setDefault has been called.
         */
        this.fromDateToMoment = function (date) {
            if (date == null || typeof date === "string") {
                return moment(date);
            }
            else {
                return moment([
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                    date.getMilliseconds(),
                ]);
            }
        };
        var defaultValue = this.props.defaultValue ? this.fromDateToMoment(this.props.defaultValue) : moment(null);
        this.state = {
            isInputFocused: false,
            isOpen: false,
            value: this.props.value !== undefined ? this.fromDateToMoment(this.props.value) : defaultValue,
            valueString: null,
        };
    }
    DateInput.prototype.render = function () {
        var dateString = this.state.isInputFocused ? this.state.valueString : this.getDateString(this.state.value);
        var date = this.state.isInputFocused ? moment(this.state.valueString, this.props.format) : this.state.value;
        var popoverContent = (React.createElement(datePicker_1.DatePicker, __assign({}, this.props, {canClearSelection: this.props.canClearSelection, defaultValue: null, onChange: this.handleDateChange, value: this.validAndInRange(this.state.value) ? this.fromMomentToDate(this.state.value) : null})));
        var inputClasses = classNames({
            "pt-intent-danger": !(this.validAndInRange(date) || this.isNull(date) || dateString === ""),
        });
        var calendarIcon = (React.createElement(core_1.Button, {className: core_1.Classes.MINIMAL, disabled: this.props.disabled, iconName: "calendar", intent: core_1.Intent.PRIMARY, onClick: this.handleIconClick}));
        return (React.createElement(core_1.Popover, {autoFocus: false, content: popoverContent, enforceFocus: false, inline: true, isOpen: this.state.isOpen, onClose: this.handleClosePopover, popoverClassName: "pt-dateinput-popover", position: this.props.popoverPosition}, 
            React.createElement(core_1.InputGroup, {className: inputClasses, disabled: this.props.disabled, inputRef: this.setInputRef, type: "text", onBlur: this.handleInputBlur, onChange: this.handleInputChange, onClick: this.handleInputClick, onFocus: this.handleInputFocus, placeholder: this.props.format, rightElement: calendarIcon, value: dateString})
        ));
    };
    DateInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: this.fromDateToMoment(nextProps.value) });
        }
        _super.prototype.componentWillReceiveProps.call(this, nextProps);
    };
    DateInput.prototype.validAndInRange = function (value) {
        return value.isValid() && this.dateIsInRange(value);
    };
    DateInput.prototype.isNull = function (value) {
        return value.parsingFlags().nullInput;
    };
    DateInput.prototype.dateIsInRange = function (value) {
        return value.isBetween(this.props.minDate, this.props.maxDate, "day", "[]");
    };
    DateInput.defaultProps = {
        closeOnSelection: true,
        disabled: false,
        format: "YYYY-MM-DD",
        invalidDateMessage: "Invalid date",
        maxDate: datePickerCore_1.getDefaultMaxDate(),
        minDate: datePickerCore_1.getDefaultMinDate(),
        openOnFocus: true,
        outOfRangeMessage: "Out of range",
        popoverPosition: core_1.Position.BOTTOM,
    };
    return DateInput;
}(core_1.AbstractComponent));
exports.DateInput = DateInput;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRlSW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLE1BQU0sV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUNqQyxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixxQkFVTyxtQkFBbUIsQ0FBQyxDQUFBO0FBRTNCLDJCQUEyQixjQUFjLENBQUMsQ0FBQTtBQUMxQywrQkFJTyxrQkFBa0IsQ0FBQyxDQUFBO0FBc0YxQjtJQUErQiw2QkFBbUQ7SUFpQjlFLG1CQUFtQixLQUF1QixFQUFFLE9BQWE7UUFqQjdELGlCQStQQztRQTdPTyxrQkFBTSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFMbkIsZ0JBQVcsR0FBRyxxQkFBcUIsQ0FBQztRQUVuQyxhQUFRLEdBQWdCLElBQUksQ0FBQztRQStFN0Isa0JBQWEsR0FBRyxVQUFDLEtBQW9CO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2QsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO2dCQUN4QyxDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFJLENB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QUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUVELGdCQUFLLENBQUMseUJBQXlCLFlBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQWdCTyxtQ0FBZSxHQUF2QixVQUF3QixLQUFvQjtRQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVPLDBCQUFNLEdBQWQsVUFBZSxLQUFvQjtRQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUMxQyxDQUFDO0lBRU8saUNBQWEsR0FBckIsVUFBc0IsS0FBb0I7UUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFySGEsc0JBQVksR0FBb0I7UUFDMUMsZ0JBQWdCLEVBQUUsSUFBSTtRQUN0QixRQUFRLEVBQUUsS0FBSztRQUNmLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLGtCQUFrQixFQUFFLGNBQWM7UUFDbEMsT0FBTyxFQUFFLGtDQUFpQixFQUFFO1FBQzVCLE9BQU8sRUFBRSxrQ0FBaUIsRUFBRTtRQUM1QixXQUFXLEVBQUUsSUFBSTtRQUNqQixpQkFBaUIsRUFBRSxjQUFjO1FBQ2pDLGVBQWUsRUFBRSxlQUFRLENBQUMsTUFBTTtLQUNuQyxDQUFDO0lBb1BOLGdCQUFDO0FBQUQsQ0EvUEEsQUErUEMsQ0EvUDhCLHdCQUFpQixHQStQL0M7QUEvUFksaUJBQVMsWUErUHJCLENBQUEiLCJmaWxlIjoiZGF0ZUlucHV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7XG4gICAgQWJzdHJhY3RDb21wb25lbnQsXG4gICAgQnV0dG9uLFxuICAgIENsYXNzZXMsXG4gICAgSW5wdXRHcm91cCxcbiAgICBJbnRlbnQsXG4gICAgSVByb3BzLFxuICAgIFBvcG92ZXIsXG4gICAgUG9zaXRpb24sXG4gICAgVXRpbHMsXG59IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuXG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcIi4vZGF0ZVBpY2tlclwiO1xuaW1wb3J0IHtcbiAgICBnZXREZWZhdWx0TWF4RGF0ZSxcbiAgICBnZXREZWZhdWx0TWluRGF0ZSxcbiAgICBJRGF0ZVBpY2tlckJhc2VQcm9wcyxcbn0gZnJvbSBcIi4vZGF0ZVBpY2tlckNvcmVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZUlucHV0UHJvcHMgZXh0ZW5kcyBJRGF0ZVBpY2tlckJhc2VQcm9wcywgSVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBBbGxvd3MgdGhlIHVzZXIgdG8gY2xlYXIgdGhlIHNlbGVjdGlvbiBieSBjbGlja2luZyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRheS5cbiAgICAgKiBQYXNzZWQgdG8gYERhdGVQaWNrZXJgIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNhbkNsZWFyU2VsZWN0aW9uPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIHBvcG92ZXIgc2hvdWxkIGNsb3NlIHdoZW4gYSBkYXRlIGlzIHNlbGVjdGVkLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBjbG9zZU9uU2VsZWN0aW9uPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZW5hYmxlZCBvciBkaXNhYmxlZC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGRhdGUgdG8gYmUgdXNlZCBpbiB0aGUgY29tcG9uZW50IHdoZW4gdW5jb250cm9sbGVkLlxuICAgICAqL1xuICAgIGRlZmF1bHRWYWx1ZT86IERhdGU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZm9ybWF0IG9mIHRoZSBkYXRlLiBTZWUgb3B0aW9uc1xuICAgICAqIGhlcmU6IGh0dHA6Ly9tb21lbnRqcy5jb20vZG9jcy8jL2Rpc3BsYXlpbmcvZm9ybWF0L1xuICAgICAqIEBkZWZhdWx0IFwiWVlZWS1NTS1ERFwiXG4gICAgICovXG4gICAgZm9ybWF0Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBkYXRlIHNlbGVjdGVkIGludmFsaWQuXG4gICAgICogQGRlZmF1bHQgXCJJbnZhbGlkIGRhdGVcIlxuICAgICAqL1xuICAgIGludmFsaWREYXRlTWVzc2FnZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBuZXcgdmFsaWQgZGF0ZSB0aHJvdWdoIHRoZSBgRGF0ZVBpY2tlcmAgb3IgYnkgdHlwaW5nXG4gICAgICogaW4gdGhlIGlucHV0LlxuICAgICAqL1xuICAgIG9uQ2hhbmdlPzogKHNlbGVjdGVkRGF0ZTogRGF0ZSkgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHRoZSB1c2VyIGZpbmlzaGVzIHR5cGluZyBpbiBhIG5ldyBkYXRlIGFuZCB0aGUgZGF0ZSBjYXVzZXMgYW4gZXJyb3Igc3RhdGUuXG4gICAgICogSWYgdGhlIGRhdGUgaXMgaW52YWxpZCwgYG5ldyBEYXRlKHVuZGVmaW5lZClgIHdpbGwgYmUgcmV0dXJuZWQuIElmIHRoZSBkYXRlIGlzIG91dCBvZiByYW5nZSxcbiAgICAgKiB0aGUgb3V0IG9mIHJhbmdlIGRhdGUgd2lsbCBiZSByZXR1cm5lZCAoYG9uQ2hhbmdlYCBpcyBub3QgY2FsbGVkIGluIHRoaXMgY2FzZSkuXG4gICAgICovXG4gICAgb25FcnJvcj86IChlcnJvckRhdGU6IERhdGUpID0+IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBJZiB0cnVlLCB0aGUgUG9wb3ZlciB3aWxsIG9wZW4gd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGlucHV0LiBJZiBmYWxzZSwgdGhlIFBvcG92ZXIgd2lsbCBvbmx5XG4gICAgICogb3BlbiB3aGVuIHRoZSBjYWxlbmRhciBpY29uIGlzIGNsaWNrZWQuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIG9wZW5PbkZvY3VzPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBlcnJvciBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgZGF0ZSBzZWxlY3RlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gICAgICogQGRlZmF1bHQgXCJPdXQgb2YgcmFuZ2VcIlxuICAgICAqL1xuICAgIG91dE9mUmFuZ2VNZXNzYWdlPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHBvc2l0aW9uIHRoZSBkYXRlIHBvcG92ZXIgc2hvdWxkIGFwcGVhciBpbiByZWxhdGl2ZSB0byB0aGUgaW5wdXQgYm94LlxuICAgICAqIEBkZWZhdWx0IFBvc2l0aW9uLkJPVFRPTVxuICAgICAqL1xuICAgIHBvcG92ZXJQb3NpdGlvbj86IFBvc2l0aW9uO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXkuIElmIHRoaXMgcHJvcCBpcyBwcmVzZW50LCB0aGUgY29tcG9uZW50IGFjdHMgaW4gYSBjb250cm9sbGVkIG1hbm5lci5cbiAgICAgKiBUbyBkaXNwbGF5IG5vIGRhdGUgaW4gdGhlIGlucHV0IGZpZWxkLCBwYXNzIGBudWxsYCB0byB0aGUgdmFsdWUgcHJvcC4gVG8gZGlzcGxheSBhbiBpbnZhbGlkIGRhdGUgZXJyb3JcbiAgICAgKiBpbiB0aGUgaW5wdXQgZmllbGQsIHBhc3MgYG5ldyBEYXRlKHVuZGVmaW5lZClgIHRvIHRoZSB2YWx1ZSBwcm9wLlxuICAgICAqL1xuICAgIHZhbHVlPzogRGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZUlucHV0U3RhdGUge1xuICAgIHZhbHVlPzogbW9tZW50Lk1vbWVudDtcbiAgICB2YWx1ZVN0cmluZz86IHN0cmluZztcbiAgICBpc0lucHV0Rm9jdXNlZD86IGJvb2xlYW47XG4gICAgaXNPcGVuPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIERhdGVJbnB1dCBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PElEYXRlSW5wdXRQcm9wcywgSURhdGVJbnB1dFN0YXRlPiB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IElEYXRlSW5wdXRQcm9wcyA9IHtcbiAgICAgICAgY2xvc2VPblNlbGVjdGlvbjogdHJ1ZSxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBmb3JtYXQ6IFwiWVlZWS1NTS1ERFwiLFxuICAgICAgICBpbnZhbGlkRGF0ZU1lc3NhZ2U6IFwiSW52YWxpZCBkYXRlXCIsXG4gICAgICAgIG1heERhdGU6IGdldERlZmF1bHRNYXhEYXRlKCksXG4gICAgICAgIG1pbkRhdGU6IGdldERlZmF1bHRNaW5EYXRlKCksXG4gICAgICAgIG9wZW5PbkZvY3VzOiB0cnVlLFxuICAgICAgICBvdXRPZlJhbmdlTWVzc2FnZTogXCJPdXQgb2YgcmFuZ2VcIixcbiAgICAgICAgcG9wb3ZlclBvc2l0aW9uOiBQb3NpdGlvbi5CT1RUT00sXG4gICAgfTtcblxuICAgIHB1YmxpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LkRhdGVJbnB1dFwiO1xuXG4gICAgcHJpdmF0ZSBpbnB1dFJlZjogSFRNTEVsZW1lbnQgPSBudWxsO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByb3BzPzogSURhdGVJbnB1dFByb3BzLCBjb250ZXh0PzogYW55KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcblxuICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSA/IHRoaXMuZnJvbURhdGVUb01vbWVudCh0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSkgOiBtb21lbnQobnVsbCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGlzSW5wdXRGb2N1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSAhPT0gdW5kZWZpbmVkID8gdGhpcy5mcm9tRGF0ZVRvTW9tZW50KHRoaXMucHJvcHMudmFsdWUpIDogZGVmYXVsdFZhbHVlLFxuICAgICAgICAgICAgdmFsdWVTdHJpbmc6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuc3RhdGUuaXNJbnB1dEZvY3VzZWQgPyB0aGlzLnN0YXRlLnZhbHVlU3RyaW5nIDogdGhpcy5nZXREYXRlU3RyaW5nKHRoaXMuc3RhdGUudmFsdWUpO1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5zdGF0ZS5pc0lucHV0Rm9jdXNlZCA/IG1vbWVudCh0aGlzLnN0YXRlLnZhbHVlU3RyaW5nLCB0aGlzLnByb3BzLmZvcm1hdCkgOiB0aGlzLnN0YXRlLnZhbHVlO1xuXG4gICAgICAgIGNvbnN0IHBvcG92ZXJDb250ZW50ID0gKFxuICAgICAgICAgICAgPERhdGVQaWNrZXJcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICBjYW5DbGVhclNlbGVjdGlvbj17dGhpcy5wcm9wcy5jYW5DbGVhclNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e251bGx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRGF0ZUNoYW5nZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy52YWxpZEFuZEluUmFuZ2UodGhpcy5zdGF0ZS52YWx1ZSkgPyB0aGlzLmZyb21Nb21lbnRUb0RhdGUodGhpcy5zdGF0ZS52YWx1ZSkgOiBudWxsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBpbnB1dENsYXNzZXMgPSBjbGFzc05hbWVzKHtcbiAgICAgICAgICAgIFwicHQtaW50ZW50LWRhbmdlclwiOiAhKHRoaXMudmFsaWRBbmRJblJhbmdlKGRhdGUpIHx8IHRoaXMuaXNOdWxsKGRhdGUpIHx8IGRhdGVTdHJpbmcgPT09IFwiXCIpLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjYWxlbmRhckljb24gPSAoXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtDbGFzc2VzLk1JTklNQUx9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgaWNvbk5hbWU9XCJjYWxlbmRhclwiXG4gICAgICAgICAgICAgICAgaW50ZW50PXtJbnRlbnQuUFJJTUFSWX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUljb25DbGlja31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQb3BvdmVyXG4gICAgICAgICAgICAgICAgYXV0b0ZvY3VzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBjb250ZW50PXtwb3BvdmVyQ29udGVudH1cbiAgICAgICAgICAgICAgICBlbmZvcmNlRm9jdXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGlubGluZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICBpc09wZW49e3RoaXMuc3RhdGUuaXNPcGVufVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2VQb3BvdmVyfVxuICAgICAgICAgICAgICAgIHBvcG92ZXJDbGFzc05hbWU9XCJwdC1kYXRlaW5wdXQtcG9wb3ZlclwiXG4gICAgICAgICAgICAgICAgcG9zaXRpb249e3RoaXMucHJvcHMucG9wb3ZlclBvc2l0aW9ufVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbGFzc2VzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuc2V0SW5wdXRSZWZ9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUlucHV0Qmx1cn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSW5wdXRDbGlja31cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVJbnB1dEZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5mb3JtYXR9XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0RWxlbWVudD17Y2FsZW5kYXJJY29ufVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZGF0ZVN0cmluZ31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Qb3BvdmVyPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogSURhdGVJbnB1dFByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdGhpcy5mcm9tRGF0ZVRvTW9tZW50KG5leHRQcm9wcy52YWx1ZSkgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRlU3RyaW5nID0gKHZhbHVlOiBtb21lbnQuTW9tZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzTnVsbCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVJc0luUmFuZ2UodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmZvcm1hdCh0aGlzLnByb3BzLmZvcm1hdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm91dE9mUmFuZ2VNZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmludmFsaWREYXRlTWVzc2FnZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZhbGlkQW5kSW5SYW5nZSh2YWx1ZTogbW9tZW50Lk1vbWVudCkge1xuICAgICAgICByZXR1cm4gdmFsdWUuaXNWYWxpZCgpICYmIHRoaXMuZGF0ZUlzSW5SYW5nZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc051bGwodmFsdWU6IG1vbWVudC5Nb21lbnQpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnBhcnNpbmdGbGFncygpLm51bGxJbnB1dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRhdGVJc0luUmFuZ2UodmFsdWU6IG1vbWVudC5Nb21lbnQpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmlzQmV0d2Vlbih0aGlzLnByb3BzLm1pbkRhdGUsIHRoaXMucHJvcHMubWF4RGF0ZSwgXCJkYXlcIiwgXCJbXVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUNsb3NlUG9wb3ZlciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogZmFsc2UgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVEYXRlQ2hhbmdlID0gKGRhdGU6IERhdGUsIGhhc1VzZXJNYW51YWxseVNlbGVjdGVkRGF0ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICBjb25zdCBtb21lbnREYXRlID0gdGhpcy5mcm9tRGF0ZVRvTW9tZW50KGRhdGUpO1xuICAgICAgICBjb25zdCBoYXNNb250aENoYW5nZWQgPSBkYXRlICE9PSBudWxsICYmICF0aGlzLmlzTnVsbCh0aGlzLnN0YXRlLnZhbHVlKSAmJiB0aGlzLnN0YXRlLnZhbHVlLmlzVmFsaWQoKSAmJlxuICAgICAgICAgICAgbW9tZW50RGF0ZS5tb250aCgpICE9PSB0aGlzLnN0YXRlLnZhbHVlLm1vbnRoKCk7XG4gICAgICAgIGNvbnN0IGlzT3BlbiA9ICEodGhpcy5wcm9wcy5jbG9zZU9uU2VsZWN0aW9uICYmIGhhc1VzZXJNYW51YWxseVNlbGVjdGVkRGF0ZSAmJiAhaGFzTW9udGhDaGFuZ2VkKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzSW5wdXRGb2N1c2VkOiBmYWxzZSwgaXNPcGVuLCB2YWx1ZTogbW9tZW50RGF0ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0lucHV0Rm9jdXNlZDogZmFsc2UsIGlzT3BlbiB9KTtcbiAgICAgICAgfVxuICAgICAgICBVdGlscy5zYWZlSW52b2tlKHRoaXMucHJvcHMub25DaGFuZ2UsIHRoaXMuZnJvbU1vbWVudFRvRGF0ZShtb21lbnREYXRlKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVJY29uQ2xpY2sgPSAoZTogUmVhY3QuU3ludGhldGljRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzT3Blbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRSZWYgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRSZWYuYmx1cigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFJlZiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFJlZi5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVJbnB1dEZvY3VzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZVN0cmluZyA9IHRoaXMuaXNOdWxsKHRoaXMuc3RhdGUudmFsdWUpID8gXCJcIiA6IHRoaXMuc3RhdGUudmFsdWUuZm9ybWF0KHRoaXMucHJvcHMuZm9ybWF0KTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vcGVuT25Gb2N1cykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzSW5wdXRGb2N1c2VkOiB0cnVlLCBpc09wZW46IHRydWUsIHZhbHVlU3RyaW5nIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzSW5wdXRGb2N1c2VkOiB0cnVlLCB2YWx1ZVN0cmluZyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlSW5wdXRDbGljayA9IChlOiBSZWFjdC5TeW50aGV0aWNFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vcGVuT25Gb2N1cykge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZTogUmVhY3QuU3ludGhldGljRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWVTdHJpbmcgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gbW9tZW50KHZhbHVlU3RyaW5nLCB0aGlzLnByb3BzLmZvcm1hdCk7XG5cbiAgICAgICAgaWYgKHZhbHVlLmlzVmFsaWQoKSAmJiB0aGlzLmRhdGVJc0luUmFuZ2UodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlLCB2YWx1ZVN0cmluZyB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlU3RyaW5nIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVXRpbHMuc2FmZUludm9rZSh0aGlzLnByb3BzLm9uQ2hhbmdlLCB0aGlzLmZyb21Nb21lbnRUb0RhdGUodmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZVN0cmluZyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlSW5wdXRCbHVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZVN0cmluZyA9IHRoaXMuc3RhdGUudmFsdWVTdHJpbmc7XG4gICAgICAgIGxldCB2YWx1ZSA9IG1vbWVudCh2YWx1ZVN0cmluZywgdGhpcy5wcm9wcy5mb3JtYXQpO1xuICAgICAgICBpZiAodmFsdWVTdHJpbmcubGVuZ3RoID4gMFxuICAgICAgICAgICAgJiYgdmFsdWVTdHJpbmcgIT09IHRoaXMuZ2V0RGF0ZVN0cmluZyh0aGlzLnN0YXRlLnZhbHVlKVxuICAgICAgICAgICAgJiYgKCF2YWx1ZS5pc1ZhbGlkKCkgfHwgIXRoaXMuZGF0ZUlzSW5SYW5nZSh2YWx1ZSkpKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNJbnB1dEZvY3VzZWQ6IGZhbHNlLCB2YWx1ZSwgdmFsdWVTdHJpbmc6IG51bGwgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0lucHV0Rm9jdXNlZDogZmFsc2UgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdmFsdWUuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuc2FmZUludm9rZSh0aGlzLnByb3BzLm9uRXJyb3IsIG5ldyBEYXRlKHVuZGVmaW5lZCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5kYXRlSXNJblJhbmdlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLnNhZmVJbnZva2UodGhpcy5wcm9wcy5vbkVycm9yLCB0aGlzLmZyb21Nb21lbnRUb0RhdGUodmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuc2FmZUludm9rZSh0aGlzLnByb3BzLm9uQ2hhbmdlLCB0aGlzLmZyb21Nb21lbnRUb0RhdGUodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNJbnB1dEZvY3VzZWQ6IGZhbHNlLCB2YWx1ZTogbW9tZW50KG51bGwpLCB2YWx1ZVN0cmluZzogbnVsbCB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzSW5wdXRGb2N1c2VkOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SW5wdXRSZWYgPSAoZWw6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXRSZWYgPSBlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGUgYSBtb21lbnQgaW50byBhIERhdGUgb2JqZWN0LCBhZGp1c3RpbmcgdGhlIG1vbWVudCB0aW1lem9uZSBpbnRvIHRoZSBsb2NhbCBvbmUuXG4gICAgICogVGhpcyBpcyBhIG5vLW9wIHVubGVzcyBtb21lbnQtdGltZXpvbmUncyBzZXREZWZhdWx0IGhhcyBiZWVuIGNhbGxlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGZyb21Nb21lbnRUb0RhdGUgPSAobW9tZW50RGF0ZTogbW9tZW50Lk1vbWVudCkgPT4ge1xuICAgICAgICBpZiAobW9tZW50RGF0ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKFxuICAgICAgICAgICAgICAgIG1vbWVudERhdGUueWVhcigpLFxuICAgICAgICAgICAgICAgIG1vbWVudERhdGUubW9udGgoKSxcbiAgICAgICAgICAgICAgICBtb21lbnREYXRlLmRhdGUoKSxcbiAgICAgICAgICAgICAgICBtb21lbnREYXRlLmhvdXJzKCksXG4gICAgICAgICAgICAgICAgbW9tZW50RGF0ZS5taW51dGVzKCksXG4gICAgICAgICAgICAgICAgbW9tZW50RGF0ZS5zZWNvbmRzKCksXG4gICAgICAgICAgICAgICAgbW9tZW50RGF0ZS5taWxsaXNlY29uZHMoKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGUgYSBEYXRlIG9iamVjdCBpbnRvIGEgbW9tZW50LCBhZGp1c3RpbmcgdGhlIGxvY2FsIHRpbWV6b25lIGludG8gdGhlIG1vbWVudCBvbmUuXG4gICAgICogVGhpcyBpcyBhIG5vLW9wIHVubGVzcyBtb21lbnQtdGltZXpvbmUncyBzZXREZWZhdWx0IGhhcyBiZWVuIGNhbGxlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGZyb21EYXRlVG9Nb21lbnQgPSAoZGF0ZTogRGF0ZSkgPT4ge1xuICAgICAgICBpZiAoZGF0ZSA9PSBudWxsIHx8IHR5cGVvZiBkYXRlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KGRhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChbXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldEhvdXJzKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRNaW51dGVzKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9