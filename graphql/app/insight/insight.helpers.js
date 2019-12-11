var utils = {
    dateDifference: (date1, date2) => {
        date1.setHours(0, 0, 0)
        date2.setHours(0, 0, 0)
        dayDiff = Math.abs((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
        return dayDiff.toFixed(0);
    },
    applyDiscount: (amount, discounts) => {
        try {
            discount = discounts[0];
            Math.min((amount * discount.percent / 100), discount.maxDiscount);
            if (+amount > discount.minOrder) {
                const discountAmt = Math.min((amount * discount.percent / 100), discount.maxDiscount);
                amount = amount - discountAmt;
            }
        } catch (err) {
            console.log(err.message);
        }

        return Math.round(amount);

    }
};

// { today: 549, yesterday: 2196, last7Days: 2745, thisMonth: 549 } { today: 2, yesterday: 4, last7Days: 6, thisMonth: 2 }


module.exports = {
    generateInsight: (carts) => {
        const today = new Date();
        let earnings = {
            today: 0,
            yesterday: 0,
            last7days: 0,
            thisMonth: 0
        }

        let orders = {
            today: 0,
            yesterday: 0,
            last7days: 0,
            thisMonth: 0
        }

        const itemInsightMap = new Map();

        carts.forEach(cart => {
            let dateDiff = utils.dateDifference(cart.addedOn, today);
            if (+dateDiff === 0) {
                earnings.today += utils.applyDiscount(cart.value, cart.delivery.discounts);
                orders.today++;
            }
            if (+dateDiff === 1) {
                earnings.yesterday += utils.applyDiscount(cart.value, cart.delivery.discounts);
                orders.yesterday++;
            }
            if (+dateDiff <= 7) {
                earnings.last7days += utils.applyDiscount(cart.value, cart.delivery.discounts);
                orders.last7days++;
            }
            if (+cart.addedOn.getMonth() === +today.getMonth() && +cart.addedOn.getYear() === +today.getYear()) {
                earnings.thisMonth += utils.applyDiscount(cart.value, cart.delivery.discounts);
                orders.thisMonth++;
            }
            cart.soldItems.forEach( item => {
                if (!itemInsightMap.has(item.code)) {
                    itemInsightMap.set(item.code, item.qty)
                } else {
                    itemInsightMap.set(item.code, itemInsightMap.get(item.code) + item.qty);
                }
            });
        });

        const itemInsights = [];

        itemInsightMap.forEach((value, key, map) => {
            itemInsights.push({code: key, sold: value});
            
        });
        
        return { earnings, orders, itemInsights };


    }

}



// { delivery:
//     { code: 'SELF',
//       pkgCharge: 10,
//       fcpo: 23,
//       fcpoMinOrder: 152,
//       discounts: [Array] },
//    soldItems: [ 5de2618357dbff10952bcb87, 5de2618357dbff10952bcb88 ],
//    _id: 5de2618357dbff10952bcb84,
//    restaurant: 5de24f9857dbff10952bcb6a,
//    addedOn: 2019-11-30T12:33:07.498Z,
//    __v: 1,
//    value: 1557 },