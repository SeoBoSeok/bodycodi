/*
@license
dhtmlxScheduler v.4.3.35 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e) {
    e.templates.calendar_month = e.date.date_to_str("%F %Y"),
    e.templates.calendar_scale_date = e.date.date_to_str("%D"),
    e.templates.calendar_date = e.date.date_to_str("%d"),
    e.config.minicalendar = {
        mark_events: !0
    },
    e._synced_minicalendars = [],
    e.renderCalendar = function(t, a, n) {
        var i = null
          , r = t.date || e._currentDate();
        if ("string" == typeof r && (r = this.templates.api_date(r)),
        a)
            i = this._render_calendar(a.parentNode, r, t, a),
            e.unmarkCalendar(i);
        else {
            var s = t.container
              , d = t.position;
            if ("string" == typeof s && (s = document.getElementById(s)),
            "string" == typeof d && (d = document.getElementById(d)),
            d && "undefined" == typeof d.left) {
                var _ = getOffset(d);
                d = {
                    top: _.top + d.offsetHeight,
                    left: _.left
                }
            }
            s || (s = e._get_def_cont(d)),
            i = this._render_calendar(s, r, t),
            i.onclick = function(t) {
                t = t || event;
                var a = t.target || t.srcElement;
                if (-1 != a.className.indexOf("dhx_month_head")) {
                    var n = a.parentNode.className;
                    if (-1 == n.indexOf("dhx_after") && -1 == n.indexOf("dhx_before")) {
                        var i = e.templates.xml_date(this.getAttribute("date"));
                        i.setDate(parseInt(a.innerHTML, 10)),
                        e.unmarkCalendar(this),
                        e.markCalendar(this, i, "dhx_calendar_click"),
                        this._last_date = i,
                        this.conf.handler && this.conf.handler.call(e, i, this)
                    }
                }
            }
        }
        if (e.config.minicalendar.mark_events)
            for (var o = e.date.month_start(r), l = e.date.add(o, 1, "month"), h = this.getEvents(o, l), c = this["filter_" + this._mode], u = {}, v = 0; v < h.length; v++) {
                var f = h[v];
                if (!c || c(f.id, f)) {
                    var g = f.start_date;
                    for (g.valueOf() < o.valueOf() && (g = o),
                    g = e.date.date_part(new Date(g.valueOf())); g < f.end_date && (u[+g] || (u[+g] = !0,
                    this.markCalendar(i, g, "dhx_year_event")),
                    g = this.date.add(g, 1, "day"),
                    !(g.valueOf() >= l.valueOf())); )
                        ;
                }
            }
        return this._markCalendarCurrentDate(i),
        i.conf = t,
        t.sync && !n && this._synced_minicalendars.push(i),
        i.conf._on_xle_handler || (i.conf._on_xle_handler = e.attachEvent("onXLE", function() {
            e.updateCalendar(i, i.conf.date)
        })),
        i
    }
    ,
    e._get_def_cont = function(e) {
        return this._def_count || (this._def_count = document.createElement("DIV"),
        this._def_count.className = "dhx_minical_popup",
        this._def_count.onclick = function(e) {
            (e || event).cancelBubble = !0
        }
        ,
        document.body.appendChild(this._def_count)),
        this._def_count.style.left = e.left + "px",
        this._def_count.style.top = e.top + "px",
        this._def_count._created = new Date,
        this._def_count
    }
    ,
    e._locateCalendar = function(t, a) {
        if ("string" == typeof a && (a = e.templates.api_date(a)),
        +a > +t._max_date || +a < +t._min_date)
            return null;
        for (var n = t.childNodes[2].childNodes[0], i = 0, r = new Date(t._min_date); +this.date.add(r, 1, "week") <= +a; )
            r = this.date.add(r, 1, "week"),
            i++;
        var s = e.config.start_on_monday
          , d = (a.getDay() || (s ? 7 : 0)) - (s ? 1 : 0);
        return n.rows[i].cells[d].firstChild
    }
    ,
    e.markCalendar = function(e, t, a) {
        var n = this._locateCalendar(e, t);
        n && (n.className += " " + a)
    }
    ,
    e.unmarkCalendar = function(e, t, a) {
        if (t = t || e._last_date,
        a = a || "dhx_calendar_click",
        t) {
            var n = this._locateCalendar(e, t);
            n && (n.className = (n.className || "").replace(RegExp(a, "g")))
        }
    }
    ,
    e._week_template = function(t) {
        for (var a = t || 250, n = 0, i = document.createElement("div"), r = this.date.week_start(e._currentDate()), s = 0; 7 > s; s++)
            this._cols[s] = Math.floor(a / (7 - s)),
            this._render_x_header(s, n, r, i),
            r = this.date.add(r, 1, "day"),
            a -= this._cols[s],
            n += this._cols[s];
        return i.lastChild.className += " dhx_scale_bar_last",
        i
    }
    ,
    e.updateCalendar = function(e, t) {
        e.conf.date = t,
        this.renderCalendar(e.conf, e, !0)
    }
    ,
    e._mini_cal_arrows = ["&nbsp", "&nbsp"],
    e._render_calendar = function(t, a, n, i) {
        var r = e.templates
          , s = this._cols;
        this._cols = [];
        var d = this._mode;
        this._mode = "calendar";
        var _ = this._colsS;
        this._colsS = {
            height: 0
        };
        var o = new Date(this._min_date)
          , l = new Date(this._max_date)
          , h = new Date(e._date)
          , c = r.month_day
          , u = this._ignores_detected;
        this._ignores_detected = 0,
        r.month_day = r.calendar_date,
        a = this.date.month_start(a);
        var v, f = this._week_template(t.offsetWidth - 1 - this.config.minicalendar.padding);
        i ? v = i : (v = document.createElement("DIV"),
        v.className = "dhx_cal_container dhx_mini_calendar"),
        v.setAttribute("date", this.templates.xml_format(a)),
        v.innerHTML = "";
        var g = document.createElement("div");
        g.className = "dhx_year_month",
        v.appendChild(g);
        var m = document.createElement("div");
        m.className = "dhx_year_week",
        v.appendChild(m);
        var p = document.createElement("div");
        if (p.className = "dhx_year_body",
        v.appendChild(p),
        f && f.children)
            for (var x = 0; x < f.children.length; x++)
                m.appendChild(f.children[x].cloneNode(!0));
        if (v.childNodes[0].innerHTML = this.templates.calendar_month(a),
        n.navigation)
            for (var y = function(t, a) {
                var n = e.date.add(t._date, a, "month");
                e.updateCalendar(t, n),
                e._date.getMonth() == t._date.getMonth() && e._date.getFullYear() == t._date.getFullYear() && e._markCalendarCurrentDate(t)
            }, b = ["dhx_cal_prev_button", "dhx_cal_next_button"], w = ["left:1px;top:2px;position:absolute;", "left:auto; right:1px;top:2px;position:absolute;"], E = [-1, 1], D = function(t) {
                return function() {
                    if (n.sync)
                        for (var a = e._synced_minicalendars, i = 0; i < a.length; i++)
                            y(a[i], t);
                    else
                        y(v, t)
                }
            }, k = 0; 2 > k; k++) {
                var M = document.createElement("DIV");
                M.className = b[k],
                M.style.cssText = w[k],
                M.innerHTML = this._mini_cal_arrows[k],
                v.firstChild.appendChild(M),
                M.onclick = D(E[k])
            }
        v._date = new Date(a),
        v.week_start = (a.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7;
        var N = v._min_date = this.date.week_start(a);
        v._max_date = this.date.add(v._min_date, 6, "week"),
        this._reset_month_scale(v.childNodes[2], a, N);
        for (var C = v.childNodes[2].firstChild.rows, O = C.length; 6 > O; O++) {
            var L = C[C.length - 1];
            C[0].parentNode.appendChild(L.cloneNode(!0));
            var S = parseInt(L.childNodes[L.childNodes.length - 1].childNodes[0].innerHTML);
            S = 10 > S ? S : 0;
            for (var T = 0; T < C[O].childNodes.length; T++)
                C[O].childNodes[T].className = "dhx_after",
                C[O].childNodes[T].childNodes[0].innerHTML = e.date.to_fixed(++S)
        }
        return i || t.appendChild(v),
        v.childNodes[1].style.height = v.childNodes[1].childNodes[0].offsetHeight - 1 + "px",
        this._cols = s,
        this._mode = d,
        this._colsS = _,
        this._min_date = o,
        this._max_date = l,
        e._date = h,
        r.month_day = c,
        this._ignores_detected = u,
        v
    }
    ,
    e.destroyCalendar = function(t, a) {
        !t && this._def_count && this._def_count.firstChild && (a || (new Date).valueOf() - this._def_count._created.valueOf() > 500) && (t = this._def_count.firstChild),
        t && (t.onclick = null,
        t.innerHTML = "",
        t.parentNode && t.parentNode.removeChild(t),
        this._def_count && (this._def_count.style.top = "-1000px"),
        t.conf && t.conf._on_xle_handler && e.detachEvent(t.conf._on_xle_handler))
    }
    ,
    e.isCalendarVisible = function() {
        return this._def_count && parseInt(this._def_count.style.top, 10) > 0 ? this._def_count : !1
    }
    ,
    e._attach_minical_events = function() {
        dhtmlxEvent(document.body, "click", function() {
            e.destroyCalendar()
        }),
        e._attach_minical_events = function() {}
    }
    ,
    e.attachEvent("onTemplatesReady", function() {
        e._attach_minical_events()
    }),
    e.templates.calendar_time = e.date.date_to_str("%d-%m-%Y"),
    e.form_blocks.calendar_time = {
        render: function() {
            var t = "<input class='dhx_readonly' type='text' readonly='true'>"
              , a = e.config
              , n = this.date.date_part(e._currentDate())
              , i = 1440
              , r = 0;
            a.limit_time_select && (r = 60 * a.first_hour,
            i = 60 * a.last_hour + 1),
            n.setHours(r / 60),
            t += " <select>";
            for (var s = r; i > s; s += 1 * this.config.time_step) {
                var d = this.templates.time_picker(n);
                t += "<option value='" + s + "'>" + d + "</option>",
                n = this.date.add(n, this.config.time_step, "minute");
            }
            t += "</select>";
            e.config.full_day;
            return "<div style='height:30px;padding-top:0; font-size:inherit;' class='dhx_section_time'>" + t + "<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>" + t + "</div>"
        },
        set_value: function(t, a, n) {
            function i(t, a, n) {
                o(t, a, n),
                t.value = e.templates.calendar_time(a),
                t._date = e.date.date_part(new Date(a))
            }
            var r, s, d = t.getElementsByTagName("input"), _ = t.getElementsByTagName("select"), o = function(t, a, n) {
                t.onclick = function() {
                    e.destroyCalendar(null, !0),
                    e.renderCalendar({
                        position: t,
                        date: new Date(this._date),
                        navigation: !0,
                        handler: function(a) {
                            t.value = e.templates.calendar_time(a),
                            t._date = new Date(a),
                            e.destroyCalendar(),
                            e.config.event_duration && e.config.auto_end_date && 0 === n && u()
                        }
                    })
                }
            };
            if (e.config.full_day) {
                if (!t._full_day) {
                    var l = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + e.locale.labels.full_day + "&nbsp;</label></input>";
                    e.config.wide_form || (l = t.previousSibling.innerHTML + l),
                    t.previousSibling.innerHTML = l,
                    t._full_day = !0
                }
                var h = t.previousSibling.getElementsByTagName("input")[0]
                  , c = 0 === e.date.time_part(n.start_date) && 0 === e.date.time_part(n.end_date);
                h.checked = c,
                _[0].disabled = h.checked,
                _[1].disabled = h.checked,
                h.onclick = function() {
                    if (h.checked === !0) {
                        var a = {};
                        e.form_blocks.calendar_time.get_value(t, a),
                        r = e.date.date_part(a.start_date),
                        s = e.date.date_part(a.end_date),
                        (+s == +r || +s >= +r && (0 !== n.end_date.getHours() || 0 !== n.end_date.getMinutes())) && (s = e.date.add(s, 1, "day"))
                    }
                    var o = r || n.start_date
                      , l = s || n.end_date;
                    i(d[0], o),
                    i(d[1], l),
                    _[0].value = 60 * o.getHours() + o.getMinutes(),
                    _[1].value = 60 * l.getHours() + l.getMinutes(),
                    _[0].disabled = h.checked,
                    _[1].disabled = h.checked;
                }
            }
            if (e.config.event_duration && e.config.auto_end_date) {
                var u = function() {
                    r = e.date.add(d[0]._date, _[0].value, "minute"),
                    s = new Date(r.getTime() + 60 * e.config.event_duration * 1e3),
                    d[1].value = e.templates.calendar_time(s),
                    d[1]._date = e.date.date_part(new Date(s)),
                    _[1].value = 60 * s.getHours() + s.getMinutes()
                };
                _[0].onchange = u
            }
            i(d[0], n.start_date, 0),
            i(d[1], n.end_date, 1),
            o = function() {}
            ,
            _[0].value = 60 * n.start_date.getHours() + n.start_date.getMinutes(),
            _[1].value = 60 * n.end_date.getHours() + n.end_date.getMinutes()
        },
        get_value: function(t, a) {
            var n = t.getElementsByTagName("input")
              , i = t.getElementsByTagName("select");
            return a.start_date = e.date.add(n[0]._date, i[0].value, "minute"),
            a.end_date = e.date.add(n[1]._date, i[1].value, "minute"),
            a.end_date <= a.start_date && (a.end_date = e.date.add(a.start_date, e.config.time_step, "minute")),
            {
                start_date: new Date(a.start_date),
                end_date: new Date(a.end_date)
            }
        },
        focus: function(e) {}
    },
    e.linkCalendar = function(t, a) {
        var n = function() {
            var n = e._date
              , i = new Date(n.valueOf());
            return a && (i = a(i)),
            i.setDate(1),
            e.updateCalendar(t, i),
            !0
        };
        e.attachEvent("onViewChange", n),
        e.attachEvent("onXLE", n),
        e.attachEvent("onEventAdded", n),
        e.attachEvent("onEventChanged", n),
        e.attachEvent("onAfterEventDelete", n),
        n()
    }
    ,
    e._markCalendarCurrentDate = function(t) {
        var a = e._date
          , n = e._mode
          , i = e.date.month_start(new Date(t._date))
          , r = e.date.add(i, 1, "month");
        if ("day" == n || this._props && this._props[n])
            i.valueOf() <= a.valueOf() && r > a && e.markCalendar(t, a, "dhx_calendar_click");
        else if ("week" == n)
            for (var s = e.date.week_start(new Date(a.valueOf())), d = 0; 7 > d; d++)
                i.valueOf() <= s.valueOf() && r > s && e.markCalendar(t, s, "dhx_calendar_click"),
                s = e.date.add(s, 1, "day")
    }
    ,
    e.attachEvent("onEventCancel", function() {
        e.destroyCalendar(null, !0)
    })
});
