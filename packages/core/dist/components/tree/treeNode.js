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
var Classes = require("../../common/classes");
var utils_1 = require("../../common/utils");
var collapse_1 = require("../collapse/collapse");
var TreeNode = (function (_super) {
    __extends(TreeNode, _super);
    function TreeNode() {
        var _this = this;
        _super.apply(this, arguments);
        this.handleCaretClick = function (e) {
            e.stopPropagation();
            var _a = _this.props, isExpanded = _a.isExpanded, onCollapse = _a.onCollapse, onExpand = _a.onExpand;
            utils_1.safeInvoke(isExpanded ? onCollapse : onExpand, _this, e);
        };
        this.handleClick = function (e) {
            utils_1.safeInvoke(_this.props.onClick, _this, e);
        };
        this.handleDoubleClick = function (e) {
            utils_1.safeInvoke(_this.props.onDoubleClick, _this, e);
        };
    }
    TreeNode.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, hasCaret = _a.hasCaret, isExpanded = _a.isExpanded, isSelected = _a.isSelected, label = _a.label;
        var showCaret = hasCaret == null ? React.Children.count(children) > 0 : hasCaret;
        var caretClass = showCaret ? Classes.TREE_NODE_CARET : Classes.TREE_NODE_CARET_NONE;
        var caretStateClass = isExpanded ? Classes.TREE_NODE_CARET_OPEN : Classes.TREE_NODE_CARET_CLOSED;
        var caretClasses = classNames(caretClass, "pt-icon-standard", (_b = {},
            _b[caretStateClass] = showCaret,
            _b
        ));
        var classes = classNames(Classes.TREE_NODE, (_c = {},
            _c[Classes.TREE_NODE_SELECTED] = isSelected,
            _c[Classes.TREE_NODE_EXPANDED] = isExpanded,
            _c
        ), className);
        var contentClasses = classNames(Classes.TREE_NODE_CONTENT, "pt-tree-node-content-" + this.props.depth);
        return (React.createElement("li", {className: classes}, 
            React.createElement("div", {className: contentClasses, onClick: this.handleClick, onDoubleClick: this.handleDoubleClick}, 
                React.createElement("span", {className: caretClasses, onClick: showCaret ? this.handleCaretClick : null}), 
                this.maybeRenderIcon(), 
                React.createElement("span", {className: Classes.TREE_NODE_LABEL}, label), 
                this.maybeRenderSecondaryLabel()), 
            React.createElement(collapse_1.Collapse, {isOpen: isExpanded}, children)));
        var _b, _c;
    };
    TreeNode.prototype.maybeRenderIcon = function () {
        var iconName = this.props.iconName;
        if (iconName != null) {
            var iconClasses = classNames(Classes.TREE_NODE_ICON, "pt-icon-standard", Classes.iconClass(iconName));
            return React.createElement("span", {className: iconClasses});
        }
        else {
            return undefined;
        }
    };
    TreeNode.prototype.maybeRenderSecondaryLabel = function () {
        if (this.props.secondaryLabel != null) {
            return React.createElement("span", {className: Classes.TREE_NODE_SECONDARY_LABEL}, this.props.secondaryLabel);
        }
        else {
            return undefined;
        }
    };
    return TreeNode;
}(React.Component));
exports.TreeNode = TreeNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3RyZWUvdHJlZU5vZGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7O0FBRUgsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFFL0IsSUFBWSxPQUFPLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQUNoRCxzQkFBMkIsb0JBQW9CLENBQUMsQ0FBQTtBQUNoRCx5QkFBeUIsc0JBQXNCLENBQUMsQ0FBQTtBQStEaEQ7SUFBOEIsNEJBQW1DO0lBQWpFO1FBQUEsaUJBb0VDO1FBcEU2Qiw4QkFBbUM7UUF1RHJELHFCQUFnQixHQUFHLFVBQUMsQ0FBb0M7WUFDNUQsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3BCLElBQUEsZ0JBQXVELEVBQS9DLDBCQUFVLEVBQUUsMEJBQVUsRUFBRSxzQkFBUSxDQUFnQjtZQUN4RCxrQkFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLEdBQUcsUUFBUSxFQUFFLEtBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUE7UUFFTyxnQkFBVyxHQUFHLFVBQUMsQ0FBbUM7WUFDdEQsa0JBQVUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFBO1FBRU8sc0JBQWlCLEdBQUcsVUFBQyxDQUFtQztZQUM1RCxrQkFBVSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEtBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUE7SUFDTCxDQUFDO0lBbkVVLHlCQUFNLEdBQWI7UUFDSSxJQUFBLGVBQWlGLEVBQTFFLHNCQUFRLEVBQUUsd0JBQVMsRUFBRSxzQkFBUSxFQUFFLDBCQUFVLEVBQUUsMEJBQVUsRUFBRSxnQkFBSyxDQUFlO1FBRWxGLElBQU0sU0FBUyxHQUFHLFFBQVEsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUNuRixJQUFNLFVBQVUsR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUM7UUFDdEYsSUFBTSxlQUFlLEdBQUcsVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUM7UUFDbkcsSUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRTtZQUM1RCxHQUFDLGVBQWUsQ0FBQyxHQUFFLFNBQVM7O1NBQy9CLENBQUMsQ0FBQztRQUVILElBQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQzFDLEdBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUUsVUFBVTtZQUN4QyxHQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFFLFVBQVU7O1NBQzNDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFZCxJQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLDBCQUF3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQU8sQ0FBQyxDQUFDO1FBRXpHLE1BQU0sQ0FBRSxDQUNKLHFCQUFDLEVBQUUsSUFBQyxTQUFTLEVBQUUsT0FBUTtZQUNuQixxQkFBQyxHQUFHLElBQ0EsU0FBUyxFQUFFLGNBQWUsRUFDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFZLEVBQzFCLGFBQWEsRUFBRSxJQUFJLENBQUMsaUJBQWtCO2dCQUV0QyxxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFFLFlBQWEsRUFBQyxPQUFPLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFLLEVBQUU7Z0JBQ2xGLElBQUksQ0FBQyxlQUFlLEVBQUc7Z0JBQ3hCLHFCQUFDLElBQUksSUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLGVBQWdCLEdBQUUsS0FBTSxDQUFPO2dCQUN2RCxJQUFJLENBQUMseUJBQXlCLEVBQUcsQ0FDaEM7WUFDTixvQkFBQyxtQkFBUSxHQUFDLE1BQU0sRUFBRSxVQUFXLEdBQ3hCLFFBQVMsQ0FDSCxDQUNWLENBQ1IsQ0FBQzs7SUFDTixDQUFDO0lBRU8sa0NBQWUsR0FBdkI7UUFDWSxrQ0FBUSxDQUFnQjtRQUNoQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEcsTUFBTSxDQUFDLHFCQUFDLElBQUksSUFBQyxTQUFTLEVBQUUsV0FBWSxFQUFFLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQUVPLDRDQUF5QixHQUFqQztRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLHFCQUFDLElBQUksSUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLHlCQUEwQixHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBZSxDQUFPLENBQUM7UUFDbEcsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQWVMLGVBQUM7QUFBRCxDQXBFQSxBQW9FQyxDQXBFNkIsS0FBSyxDQUFDLFNBQVMsR0FvRTVDO0FBcEVZLGdCQUFRLFdBb0VwQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvdHJlZS90cmVlTm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCAqIGFzIENsYXNzZXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9jbGFzc2VzXCI7XG5pbXBvcnQgeyBzYWZlSW52b2tlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsc1wiO1xuaW1wb3J0IHsgQ29sbGFwc2UgfSBmcm9tIFwiLi4vY29sbGFwc2UvY29sbGFwc2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJVHJlZU5vZGUge1xuICAgIC8qKlxuICAgICAqIENoaWxkIHRyZWUgbm9kZXMgb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIGNoaWxkTm9kZXM/OiBJVHJlZU5vZGVbXTtcblxuICAgIC8qKlxuICAgICAqIEEgc3BhY2UtZGVsaW1pdGVkIHN0cmluZyBvZiBjbGFzcyBuYW1lcyB0byBhcHBseSB0byB0aGUgbm9kZS5cbiAgICAgKi9cbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBjYXJldCB0byBleHBhbmQvY29sbGFwc2UgYSBub2RlIHNob3VsZCBiZSBzaG93bi5cbiAgICAgKiBJZiBub3Qgc3BlY2lmaWVkLCB0aGlzIHdpbGwgYmUgdHJ1ZSBpZiB0aGUgbm9kZSBoYXMgY2hpbGRyZW4gYW5kIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBoYXNDYXJldD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiBhIEJsdWVwcmludCBpY29uIHRvIGRpc3BsYXkgbmV4dCB0byB0aGUgbm9kZSdzIGxhYmVsLlxuICAgICAqL1xuICAgIGljb25OYW1lPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIG5vZGUuXG4gICAgICovXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZSBhcmUgZGlzcGxheWVkLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgaXNFeHBhbmRlZD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoaXMgbm9kZSBpcyBzZWxlY3RlZC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGlzU2VsZWN0ZWQ/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1haW4gbGFiZWwgZm9yIHRoZSBub2RlLlxuICAgICAqL1xuICAgIGxhYmVsOiBzdHJpbmcgfCBKU1guRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEEgc2Vjb25kYXJ5IGxhYmVsL2NvbXBvbmVudCB0aGF0IGlzIGRpc3BsYXllZCBhdCB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgbm9kZS5cbiAgICAgKi9cbiAgICBzZWNvbmRhcnlMYWJlbD86IHN0cmluZyB8IEpTWC5FbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUcmVlTm9kZVByb3BzIGV4dGVuZHMgSVRyZWVOb2RlIHtcbiAgICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgICBkZXB0aDogbnVtYmVyO1xuICAgIGtleT86IHN0cmluZyB8IG51bWJlcjtcbiAgICBvbkNsaWNrPzogKG5vZGU6IFRyZWVOb2RlLCBlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcbiAgICBvbkNvbGxhcHNlPzogKG5vZGU6IFRyZWVOb2RlLCBlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxTcGFuRWxlbWVudD4pID0+IHZvaWQ7XG4gICAgb25Eb3VibGVDbGljaz86IChub2RlOiBUcmVlTm9kZSwgZTogUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG4gICAgb25FeHBhbmQ/OiAobm9kZTogVHJlZU5vZGUsIGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTFNwYW5FbGVtZW50PikgPT4gdm9pZDtcbiAgICBwYXRoOiBudW1iZXJbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElUcmVlTm9kZVByb3BzLCB7fT4ge1xuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtjaGlsZHJlbiwgY2xhc3NOYW1lLCBoYXNDYXJldCwgaXNFeHBhbmRlZCwgaXNTZWxlY3RlZCwgbGFiZWx9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBjb25zdCBzaG93Q2FyZXQgPSBoYXNDYXJldCA9PSBudWxsID8gUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID4gMCA6IGhhc0NhcmV0O1xuICAgICAgICBjb25zdCBjYXJldENsYXNzID0gc2hvd0NhcmV0ID8gQ2xhc3Nlcy5UUkVFX05PREVfQ0FSRVQgOiBDbGFzc2VzLlRSRUVfTk9ERV9DQVJFVF9OT05FO1xuICAgICAgICBjb25zdCBjYXJldFN0YXRlQ2xhc3MgPSBpc0V4cGFuZGVkID8gQ2xhc3Nlcy5UUkVFX05PREVfQ0FSRVRfT1BFTiA6IENsYXNzZXMuVFJFRV9OT0RFX0NBUkVUX0NMT1NFRDtcbiAgICAgICAgY29uc3QgY2FyZXRDbGFzc2VzID0gY2xhc3NOYW1lcyhjYXJldENsYXNzLCBcInB0LWljb24tc3RhbmRhcmRcIiwge1xuICAgICAgICAgICAgW2NhcmV0U3RhdGVDbGFzc106IHNob3dDYXJldCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZXMoQ2xhc3Nlcy5UUkVFX05PREUsIHtcbiAgICAgICAgICAgIFtDbGFzc2VzLlRSRUVfTk9ERV9TRUxFQ1RFRF06IGlzU2VsZWN0ZWQsXG4gICAgICAgICAgICBbQ2xhc3Nlcy5UUkVFX05PREVfRVhQQU5ERURdOiBpc0V4cGFuZGVkLFxuICAgICAgICB9LCBjbGFzc05hbWUpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnRDbGFzc2VzID0gY2xhc3NOYW1lcyhDbGFzc2VzLlRSRUVfTk9ERV9DT05URU5ULCBgcHQtdHJlZS1ub2RlLWNvbnRlbnQtJHt0aGlzLnByb3BzLmRlcHRofWApO1xuXG4gICAgICAgIHJldHVybiAgKFxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17Y2xhc3Nlc30+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NvbnRlbnRDbGFzc2VzfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICAgICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXt0aGlzLmhhbmRsZURvdWJsZUNsaWNrfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjYXJldENsYXNzZXN9IG9uQ2xpY2s9e3Nob3dDYXJldCA/IHRoaXMuaGFuZGxlQ2FyZXRDbGljayA6IG51bGx9Lz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMubWF5YmVSZW5kZXJJY29uKCl9XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Q2xhc3Nlcy5UUkVFX05PREVfTEFCRUx9PntsYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLm1heWJlUmVuZGVyU2Vjb25kYXJ5TGFiZWwoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Q29sbGFwc2UgaXNPcGVuPXtpc0V4cGFuZGVkfT5cbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvQ29sbGFwc2U+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF5YmVSZW5kZXJJY29uKCkge1xuICAgICAgICBjb25zdCB7IGljb25OYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBpZiAoaWNvbk5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgaWNvbkNsYXNzZXMgPSBjbGFzc05hbWVzKENsYXNzZXMuVFJFRV9OT0RFX0lDT04sIFwicHQtaWNvbi1zdGFuZGFyZFwiLCBDbGFzc2VzLmljb25DbGFzcyhpY29uTmFtZSkpO1xuICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17aWNvbkNsYXNzZXN9Lz47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXliZVJlbmRlclNlY29uZGFyeUxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWNvbmRhcnlMYWJlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtDbGFzc2VzLlRSRUVfTk9ERV9TRUNPTkRBUllfTEFCRUx9Pnt0aGlzLnByb3BzLnNlY29uZGFyeUxhYmVsfTwvc3Bhbj47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVDYXJldENsaWNrID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTFNwYW5FbGVtZW50PikgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCB7IGlzRXhwYW5kZWQsIG9uQ29sbGFwc2UsIG9uRXhwYW5kIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBzYWZlSW52b2tlKGlzRXhwYW5kZWQgPyBvbkNvbGxhcHNlIDogb25FeHBhbmQsIHRoaXMsIGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ2xpY2sgPSAoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgICAgc2FmZUludm9rZSh0aGlzLnByb3BzLm9uQ2xpY2ssIHRoaXMsIGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlRG91YmxlQ2xpY2sgPSAoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgICAgc2FmZUludm9rZSh0aGlzLnByb3BzLm9uRG91YmxlQ2xpY2ssIHRoaXMsIGUpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
