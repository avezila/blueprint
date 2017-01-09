/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
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
var classNames = require("classnames");
var React = require("react");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
(function (AnimationStates) {
    AnimationStates[AnimationStates["CLOSED"] = 0] = "CLOSED";
    AnimationStates[AnimationStates["OPENING"] = 1] = "OPENING";
    AnimationStates[AnimationStates["OPEN"] = 2] = "OPEN";
    AnimationStates[AnimationStates["CLOSING_START"] = 3] = "CLOSING_START";
    AnimationStates[AnimationStates["CLOSING_END"] = 4] = "CLOSING_END";
})(exports.AnimationStates || (exports.AnimationStates = {}));
var AnimationStates = exports.AnimationStates;
/*
 * A collapse can be in one of 5 states:
 * CLOSED
 * When in this state, the contents of the collapse is not rendered, the collapse height is 0,
 * and the body Y is at -height (so that the bottom of the body is at Y=0).
 *
 * OPEN
 * When in this state, the collapse height is set to auto, and the body Y is set to 0 (so the element can be seen
 * as normal).
 *
 * CLOSING_START
 * When in this state, height has been changed from auto to the measured height of the body to prepare for the
 * closing animation in CLOSING_END.
 *
 * CLOSING_END
 * When in this state, the height is set to 0 and the body Y is at -height. Both of these properties are transformed,
 * and then after the animation is complete, the state changes to CLOSED.
 *
 * OPENING
 * When in this state, the body is re-rendered, height is set to the measured body height and the body Y is set to 0.
 * This is all animated, and on complete, the state changes to OPEN.
 *
 * When changing the isOpen prop, the following happens to the states:
 * isOpen = true : CLOSED -> OPENING -> OPEN
 * isOpen = false: OPEN -> CLOSING_START -> CLOSING_END -> CLOSED
 * These are all animated.
 */
var Collapse = (function (_super) {
    __extends(Collapse, _super);
    function Collapse() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            animationState: AnimationStates.OPEN,
            height: "0px",
        };
        // The most recent non-0 height (once a height has been measured - is 0 until then)
        this.height = 0;
        this.contentsRefHandler = function (el) {
            _this.contents = el;
            if (el != null) {
                _this.height = _this.contents.clientHeight;
                _this.setState({
                    animationState: _this.props.isOpen ? AnimationStates.OPEN : AnimationStates.CLOSED,
                    height: _this.height + "px",
                });
            }
        };
    }
    Collapse.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (this.contents != null && this.contents.clientHeight !== 0) {
            this.height = this.contents.clientHeight;
        }
        if (this.props.isOpen !== nextProps.isOpen) {
            this.clearTimeouts();
            if (this.state.animationState !== AnimationStates.CLOSED && !nextProps.isOpen) {
                this.setState({
                    animationState: AnimationStates.CLOSING_START,
                    height: this.height + "px",
                });
            }
            else if (this.state.animationState !== AnimationStates.OPEN && nextProps.isOpen) {
                this.setState({
                    animationState: AnimationStates.OPENING,
                    height: this.height + "px",
                });
                this.setTimeout(function () { return _this.onDelayedStateChange(); }, this.props.transitionDuration);
            }
        }
    };
    Collapse.prototype.render = function () {
        var showContents = (this.state.animationState !== AnimationStates.CLOSED);
        var displayWithTransform = showContents && (this.state.animationState !== AnimationStates.CLOSING_END);
        var isAutoHeight = (this.state.height === "auto");
        var containerStyle = {
            height: showContents ? this.state.height : null,
            overflow: isAutoHeight ? "visible" : null,
            transition: isAutoHeight ? "none" : null,
        };
        var contentsStyle = {
            transform: displayWithTransform ? "translateY(0)" : "translateY(-" + this.height + "px)",
            transition: isAutoHeight ? "none" : null,
        };
        // quick type cast because there's no single overload that supports all three ReactTypes (str | Cmp | SFC)
        return React.createElement(this.props.component, {
            className: classNames(Classes.COLLAPSE, this.props.className),
            style: containerStyle,
        }, React.createElement("div", {className: "pt-collapse-body", ref: this.contentsRefHandler, style: contentsStyle}, showContents ? this.props.children : null));
    };
    Collapse.prototype.componentDidMount = function () {
        this.forceUpdate();
        if (this.props.isOpen) {
            this.setState({ animationState: AnimationStates.OPEN, height: "auto" });
        }
        else {
            this.setState({ animationState: AnimationStates.CLOSED });
        }
    };
    Collapse.prototype.componentDidUpdate = function () {
        var _this = this;
        if (this.state.animationState === AnimationStates.CLOSING_START) {
            this.setTimeout(function () { return _this.setState({
                animationState: AnimationStates.CLOSING_END,
                height: "0px",
            }); });
            this.setTimeout(function () { return _this.onDelayedStateChange(); }, this.props.transitionDuration);
        }
    };
    Collapse.prototype.onDelayedStateChange = function () {
        switch (this.state.animationState) {
            case AnimationStates.OPENING:
                this.setState({ animationState: AnimationStates.OPEN, height: "auto" });
                break;
            case AnimationStates.CLOSING_END:
                this.setState({ animationState: AnimationStates.CLOSED });
                break;
            default:
                break;
        }
    };
    Collapse.displayName = "Blueprint.Collapse";
    Collapse.defaultProps = {
        component: "div",
        isOpen: false,
        transitionDuration: 200,
    };
    return Collapse;
}(abstractComponent_1.AbstractComponent));
exports.Collapse = Collapse;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2NvbGxhcHNlL2NvbGxhcHNlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLGtDQUFrQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ25FLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFpQ2hELFdBQVksZUFBZTtJQUN2Qix5REFBTSxDQUFBO0lBQ04sMkRBQU8sQ0FBQTtJQUNQLHFEQUFJLENBQUE7SUFDSix1RUFBYSxDQUFBO0lBQ2IsbUVBQVcsQ0FBQTtBQUNmLENBQUMsRUFOVyx1QkFBZSxLQUFmLHVCQUFlLFFBTTFCO0FBTkQsSUFBWSxlQUFlLEdBQWYsdUJBTVgsQ0FBQTtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNIO0lBQThCLDRCQUFpRDtJQUEvRTtRQUFBLGlCQTZHQztRQTdHNkIsOEJBQWlEO1FBU3BFLFVBQUssR0FBRztZQUNYLGNBQWMsRUFBRSxlQUFlLENBQUMsSUFBSTtZQUNwQyxNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDO1FBSUYsbUZBQW1GO1FBQzNFLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFxRW5CLHVCQUFrQixHQUFHLFVBQUMsRUFBZTtZQUN6QyxLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDYixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO2dCQUN6QyxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLGNBQWMsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxNQUFNO29C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QyxDQUFDO1lBQ2hDLEtBQUssZUFBZSxDQUFDLE9BQU87Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDeEUsS0FBSyxDQUFDO1lBQ1YsS0FBSyxlQUFlLENBQUMsV0FBVztnQkFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDMUQsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUEzR2Esb0JBQVcsR0FBRyxvQkFBb0IsQ0FBQztJQUVuQyxxQkFBWSxHQUFtQjtRQUN6QyxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsS0FBSztRQUNiLGtCQUFrQixFQUFFLEdBQUc7S0FDMUIsQ0FBQztJQXNHTixlQUFDO0FBQUQsQ0E3R0EsQUE2R0MsQ0E3RzZCLHFDQUFpQixHQTZHOUM7QUE3R1ksZ0JBQVEsV0E2R3BCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9jb2xsYXBzZS9jb2xsYXBzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hYnN0cmFjdENvbXBvbmVudFwiO1xuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCB7IElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJQ29sbGFwc2VQcm9wcyBleHRlbmRzIElQcm9wcyB7XG4gICAgLyoqXG4gICAgICogQ29tcG9uZW50IHRvIHJlbmRlciBhcyB0aGUgcm9vdCBlbGVtZW50LlxuICAgICAqIFVzZWZ1bCB3aGVuIHJlbmRlcmluZyBhIENvbGxhcHNlIGluc2lkZSBhIGA8dGFibGU+YCwgZm9yIGluc3RhbmNlLlxuICAgICAqIEBkZWZhdWx0IFwiZGl2XCJcbiAgICAgKi9cbiAgICBjb21wb25lbnQ/OiBSZWFjdC5SZWFjdFR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBjb21wb25lbnQgaXMgb3BlbiBvciBjbG9zZWQuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBpc09wZW4/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGxlbmd0aCBvZiB0aW1lIHRoZSB0cmFuc2l0aW9uIHRha2VzLCBpbiBtcy4gVGhpcyBtdXN0IG1hdGNoIHRoZSBkdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uIGluIENTUy5cbiAgICAgKiBPbmx5IHNldCB0aGlzIHByb3AgaWYgeW91IG92ZXJyaWRlIEJsdWVwcmludCdzIGRlZmF1bHQgdHJhbnNpdGlvbnMgd2l0aCBuZXcgdHJhbnNpdGlvbnMgb2YgYSBkaWZmZXJlbnQgbGVuZ3RoLlxuICAgICAqIEBkZWZhdWx0IDIwMFxuICAgICAqL1xuICAgIHRyYW5zaXRpb25EdXJhdGlvbj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29sbGFwc2VTdGF0ZSB7XG4gICAgLyoqIFRoZSBoZWlnaHQgdGhhdCBzaG91bGQgYmUgdXNlZCBmb3IgdGhlIGNvbnRlbnQgYW5pbWF0aW9ucy4gVGhpcyBpcyBhIENTUyB2YWx1ZSwgbm90IGp1c3QgYSBudW1iZXIuICovXG4gICAgaGVpZ2h0Pzogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBzdGF0ZSB0aGUgZWxlbWVudCBpcyBjdXJyZW50bHkgaW4uICovXG4gICAgYW5pbWF0aW9uU3RhdGU/OiBBbmltYXRpb25TdGF0ZXM7XG59XG5cbmV4cG9ydCBlbnVtIEFuaW1hdGlvblN0YXRlcyB7XG4gICAgQ0xPU0VELFxuICAgIE9QRU5JTkcsXG4gICAgT1BFTixcbiAgICBDTE9TSU5HX1NUQVJULFxuICAgIENMT1NJTkdfRU5ELFxufVxuXG4vKlxuICogQSBjb2xsYXBzZSBjYW4gYmUgaW4gb25lIG9mIDUgc3RhdGVzOlxuICogQ0xPU0VEXG4gKiBXaGVuIGluIHRoaXMgc3RhdGUsIHRoZSBjb250ZW50cyBvZiB0aGUgY29sbGFwc2UgaXMgbm90IHJlbmRlcmVkLCB0aGUgY29sbGFwc2UgaGVpZ2h0IGlzIDAsXG4gKiBhbmQgdGhlIGJvZHkgWSBpcyBhdCAtaGVpZ2h0IChzbyB0aGF0IHRoZSBib3R0b20gb2YgdGhlIGJvZHkgaXMgYXQgWT0wKS5cbiAqXG4gKiBPUEVOXG4gKiBXaGVuIGluIHRoaXMgc3RhdGUsIHRoZSBjb2xsYXBzZSBoZWlnaHQgaXMgc2V0IHRvIGF1dG8sIGFuZCB0aGUgYm9keSBZIGlzIHNldCB0byAwIChzbyB0aGUgZWxlbWVudCBjYW4gYmUgc2VlblxuICogYXMgbm9ybWFsKS5cbiAqXG4gKiBDTE9TSU5HX1NUQVJUXG4gKiBXaGVuIGluIHRoaXMgc3RhdGUsIGhlaWdodCBoYXMgYmVlbiBjaGFuZ2VkIGZyb20gYXV0byB0byB0aGUgbWVhc3VyZWQgaGVpZ2h0IG9mIHRoZSBib2R5IHRvIHByZXBhcmUgZm9yIHRoZVxuICogY2xvc2luZyBhbmltYXRpb24gaW4gQ0xPU0lOR19FTkQuXG4gKlxuICogQ0xPU0lOR19FTkRcbiAqIFdoZW4gaW4gdGhpcyBzdGF0ZSwgdGhlIGhlaWdodCBpcyBzZXQgdG8gMCBhbmQgdGhlIGJvZHkgWSBpcyBhdCAtaGVpZ2h0LiBCb3RoIG9mIHRoZXNlIHByb3BlcnRpZXMgYXJlIHRyYW5zZm9ybWVkLFxuICogYW5kIHRoZW4gYWZ0ZXIgdGhlIGFuaW1hdGlvbiBpcyBjb21wbGV0ZSwgdGhlIHN0YXRlIGNoYW5nZXMgdG8gQ0xPU0VELlxuICpcbiAqIE9QRU5JTkdcbiAqIFdoZW4gaW4gdGhpcyBzdGF0ZSwgdGhlIGJvZHkgaXMgcmUtcmVuZGVyZWQsIGhlaWdodCBpcyBzZXQgdG8gdGhlIG1lYXN1cmVkIGJvZHkgaGVpZ2h0IGFuZCB0aGUgYm9keSBZIGlzIHNldCB0byAwLlxuICogVGhpcyBpcyBhbGwgYW5pbWF0ZWQsIGFuZCBvbiBjb21wbGV0ZSwgdGhlIHN0YXRlIGNoYW5nZXMgdG8gT1BFTi5cbiAqXG4gKiBXaGVuIGNoYW5naW5nIHRoZSBpc09wZW4gcHJvcCwgdGhlIGZvbGxvd2luZyBoYXBwZW5zIHRvIHRoZSBzdGF0ZXM6XG4gKiBpc09wZW4gPSB0cnVlIDogQ0xPU0VEIC0+IE9QRU5JTkcgLT4gT1BFTlxuICogaXNPcGVuID0gZmFsc2U6IE9QRU4gLT4gQ0xPU0lOR19TVEFSVCAtPiBDTE9TSU5HX0VORCAtPiBDTE9TRURcbiAqIFRoZXNlIGFyZSBhbGwgYW5pbWF0ZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb2xsYXBzZSBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PElDb2xsYXBzZVByb3BzLCBJQ29sbGFwc2VTdGF0ZT4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5Db2xsYXBzZVwiO1xuXG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IElDb2xsYXBzZVByb3BzID0ge1xuICAgICAgICBjb21wb25lbnQ6IFwiZGl2XCIsXG4gICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogMjAwLFxuICAgIH07XG5cbiAgICBwdWJsaWMgc3RhdGUgPSB7XG4gICAgICAgIGFuaW1hdGlvblN0YXRlOiBBbmltYXRpb25TdGF0ZXMuT1BFTixcbiAgICAgICAgaGVpZ2h0OiBcIjBweFwiLFxuICAgIH07XG5cbiAgICAvLyBUaGUgZWxlbWVudCBjb250YWluaW5nIHRoZSBjb250ZW50cyBvZiB0aGUgY29sbGFwc2UuXG4gICAgcHJpdmF0ZSBjb250ZW50czogSFRNTEVsZW1lbnQ7XG4gICAgLy8gVGhlIG1vc3QgcmVjZW50IG5vbi0wIGhlaWdodCAob25jZSBhIGhlaWdodCBoYXMgYmVlbiBtZWFzdXJlZCAtIGlzIDAgdW50aWwgdGhlbilcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogSUNvbGxhcHNlUHJvcHMpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudHMgIT0gbnVsbCAmJiB0aGlzLmNvbnRlbnRzLmNsaWVudEhlaWdodCAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNvbnRlbnRzLmNsaWVudEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pc09wZW4gIT09IG5leHRQcm9wcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0cygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuYW5pbWF0aW9uU3RhdGUgIT09IEFuaW1hdGlvblN0YXRlcy5DTE9TRUQgJiYgIW5leHRQcm9wcy5pc09wZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlcy5DTE9TSU5HX1NUQVJULFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke3RoaXMuaGVpZ2h0fXB4YCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hbmltYXRpb25TdGF0ZSAhPT0gQW5pbWF0aW9uU3RhdGVzLk9QRU4gJiYgbmV4dFByb3BzLmlzT3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TdGF0ZTogQW5pbWF0aW9uU3RhdGVzLk9QRU5JTkcsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogYCR7dGhpcy5oZWlnaHR9cHhgLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dCgoKSA9PiB0aGlzLm9uRGVsYXllZFN0YXRlQ2hhbmdlKCksIHRoaXMucHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHNob3dDb250ZW50cyA9ICh0aGlzLnN0YXRlLmFuaW1hdGlvblN0YXRlICE9PSBBbmltYXRpb25TdGF0ZXMuQ0xPU0VEKTtcbiAgICAgICAgY29uc3QgZGlzcGxheVdpdGhUcmFuc2Zvcm0gPSBzaG93Q29udGVudHMgJiYgKHRoaXMuc3RhdGUuYW5pbWF0aW9uU3RhdGUgIT09IEFuaW1hdGlvblN0YXRlcy5DTE9TSU5HX0VORCk7XG4gICAgICAgIGNvbnN0IGlzQXV0b0hlaWdodCA9ICh0aGlzLnN0YXRlLmhlaWdodCA9PT0gXCJhdXRvXCIpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICAgICAgICAgICAgaGVpZ2h0OiBzaG93Q29udGVudHMgPyB0aGlzLnN0YXRlLmhlaWdodCA6IG51bGwsXG4gICAgICAgICAgICBvdmVyZmxvdzogaXNBdXRvSGVpZ2h0ID8gXCJ2aXNpYmxlXCIgOiBudWxsLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogaXNBdXRvSGVpZ2h0ID8gXCJub25lXCIgOiBudWxsLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnRzU3R5bGUgPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IGRpc3BsYXlXaXRoVHJhbnNmb3JtID8gXCJ0cmFuc2xhdGVZKDApXCIgOiBgdHJhbnNsYXRlWSgtJHt0aGlzLmhlaWdodH1weClgLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogaXNBdXRvSGVpZ2h0ID8gXCJub25lXCIgOiBudWxsLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHF1aWNrIHR5cGUgY2FzdCBiZWNhdXNlIHRoZXJlJ3Mgbm8gc2luZ2xlIG92ZXJsb2FkIHRoYXQgc3VwcG9ydHMgYWxsIHRocmVlIFJlYWN0VHlwZXMgKHN0ciB8IENtcCB8IFNGQylcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQgYXMgc3RyaW5nLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoQ2xhc3Nlcy5DT0xMQVBTRSwgdGhpcy5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgc3R5bGU6IGNvbnRhaW5lclN0eWxlLFxuICAgICAgICB9LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC1jb2xsYXBzZS1ib2R5XCIgcmVmPXt0aGlzLmNvbnRlbnRzUmVmSGFuZGxlcn0gc3R5bGU9e2NvbnRlbnRzU3R5bGV9PlxuICAgICAgICAgICAgICAgIHtzaG93Q29udGVudHMgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PixcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlcy5PUEVOLCBoZWlnaHQ6IFwiYXV0b1wiIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuaW1hdGlvblN0YXRlOiBBbmltYXRpb25TdGF0ZXMuQ0xPU0VEIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYW5pbWF0aW9uU3RhdGUgPT09IEFuaW1hdGlvblN0YXRlcy5DTE9TSU5HX1NUQVJUKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlcy5DTE9TSU5HX0VORCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMHB4XCIsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5vbkRlbGF5ZWRTdGF0ZUNoYW5nZSgpLCB0aGlzLnByb3BzLnRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnRlbnRzUmVmSGFuZGxlciA9IChlbDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgdGhpcy5jb250ZW50cyA9IGVsO1xuICAgICAgICBpZiAoZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNvbnRlbnRzLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvblN0YXRlOiB0aGlzLnByb3BzLmlzT3BlbiA/IEFuaW1hdGlvblN0YXRlcy5PUEVOIDogQW5pbWF0aW9uU3RhdGVzLkNMT1NFRCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke3RoaXMuaGVpZ2h0fXB4YCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkRlbGF5ZWRTdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLmFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIEFuaW1hdGlvblN0YXRlcy5PUEVOSU5HOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmltYXRpb25TdGF0ZTogQW5pbWF0aW9uU3RhdGVzLk9QRU4sIGhlaWdodDogXCJhdXRvXCIgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFuaW1hdGlvblN0YXRlcy5DTE9TSU5HX0VORDpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlcy5DTE9TRUQgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
