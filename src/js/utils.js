class Utils {

    static point_in_rect(x, y, rect) {
        return x > rect.x && 
            x < rect.x + rect.width &&
            y > rect.y &&
            y < rect.y + rect.height;
    }

    static point_in_circle(x, y, circle) {
        return Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2) < Math.pow(circle.r, 2)
    }

    static rect_in_rect(innerrect, outerrect) {
        return Utils.point_in_rect(innerrect.x, innerrect.y, outerrect) &&
            Utils.point_in_rect(innerrect.x + innerrect.width, innerrect.y, outerrect) &&
            Utils.point_in_rect(innerrect.x, innerrect.y + innerrect.height, outerrect) &&
            Utils.point_in_rect(innerrect.x + innerrect.width, innerrect.y + innerrect.height, outerrect)
    }

}
export { Utils }
