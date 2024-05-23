class JSNumberCounter {
    constructor(t={})
    {
        this.options = t,
        this.sectionId = null,
        this.countersClassName = "counter",
        this.duration = 3e3,
        this.section = null,
        this.counters = null,
        this.recountable = !1,
        this.viewport = 30,
        this.counting = !1,
        this.counted = !1,
        this.countedTimes = 0;
        try {
            this.checkRequiredOptions(),
            this.initOptions(),
            this.initSection(),
            this.initCounters(),
            this.start()
        } catch (t) {
            return void console.error(t)
        }
    }
    checkRequiredOptions()
    {
        if (!this.options.sectionId)
            throw "Make sure to ininialize ( sectionId )";
        return !0
    }
    initOptions()
    {
        this.options.sectionId && (this.sectionId = this.options.sectionId),
        this.options.countersClassName && (this.countersClassName = this.options.countersClassName),
        this.options.recountable && (this.recountable = this.options.recountable),
        this.options.viewport && (this.viewport = this.options.viewport),
        this.options.duration && (this.duration = this.options.duration)
    }
    initSection()
    {
        let t = document.getElementById(this.sectionId);
        if (!t)
            throw "Section #" + this.sectionId + " not found!";
        this.section = t
    }
    initCounters()
    {
        let t = this.section.getElementsByClassName(this.countersClassName);
        if (!t)
            throw "Section #" + this.sectionId + " has no counters!";
        this.counters = t
    }
    start()
    {
        this.isPartialyViewport() ? document.addEventListener("scroll", this.countPartialy.bind(this)) : document.addEventListener("scroll", this.count.bind(this))
    }
    startListining()
    {
        document.addEventListener("scroll", this.count())
    }
    stopListining()
    {
        document.removeEventListener("scroll", this.count())
    }
    isPartialyViewport()
    {
        return "number" == typeof this.viewport
    }
    isInViewport()
    {
        const t = this.section.getBoundingClientRect();
        return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth)
    }
    isInViewportPartialy()
    {
        let t = this.section.getBoundingClientRect(),
            e = window.innerHeight || document.documentElement.clientHeight;
        return !(Math.floor(100 - (t.top >= 0 ? 0 : t.top) / +-t.height * 100) < this.viewport || Math.floor(100 - (t.bottom - e) / t.height * 100) < this.viewport)
    }
    withCommas(t)
    {
        return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    animateValue(t, e, i, n)
    {
        this.counting = !0;
        let o = null;
        const s = r => {
            o || (o = r);
            const a = Math.min((r - o) / n, 1);
            t.innerHTML = this.withCommas(Math.floor(a * (i - e))),
            a < 1 && window.requestAnimationFrame(s),
            1 === a && (this.counting = !1)
        };
        window.requestAnimationFrame(s)
    }
    canNotCount()
    {
        return this.counting || !this.recountable && this.counted
    }
    countPartialy()
    {
        if (this.canNotCount())
            return !1;
        if (this.isInViewportPartialy()) {
            for (const t of this.counters)
                this.animateValue(t, t.dataset.from, t.dataset.to, this.duration);
            this.counted = !0,
            this.countedTimes++
        }
    }
    count()
    {
        if (this.canNotCount())
            return !1;
        if (this.isInViewport()) {
            for (const t of this.counters)
                this.animateValue(t, t.dataset.from, t.dataset.to, this.duration);
            this.counted = !0,
            this.countedTimes++
        }
    }
}
