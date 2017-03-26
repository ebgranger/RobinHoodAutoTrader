function simple_moving_average(arr, period) {
    var nums = arr;
    if (nums.length > period)
      nums.splice(0,nums.length-period);
    var sum = 0;
    for (var i in nums)
      sum += nums[i];
      var n = period;
      if (nums.length < period)
        n = nums.length;
      sma = (sum/n);
      return sma;
    }
