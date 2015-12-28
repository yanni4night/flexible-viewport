# viewport 解决方案原理

## 目标

 - UE只输出一套基准UE图，即固定的宽度(px)
 - 在各种手机屏幕上，元素尺寸相对于宽度的比值保持不变，与UE图一致

## 手段

设基准UE图宽度为 `ue_w`，\<html\> 元素的 _font-size_ 为 `ue_fs px`。

在 PSD 上量得一个元素的宽度为 `psd_w px`，即 

    psd_rem = psd_w / ue_fs ---------(1)

在一个宽度为 `foo_w` 的设备上，该元素应该设定的宽度为 `x_w`。因为比值相同，则：

    x_w / foo_w =  psd_w / ue_w ---------(2)

设该设备上 \<html\> 的 _font-size_ 为 `foo_fs`。则

    foo_rem = x_w / foo_fs  -----------(3)

将(1)、(3)代入(2)，得：

    foo_rem * foo_fs / foo_w = psd_rem * ue_fs / ue_w -----------(4)
得出：

    foo_rem = psd_rem * (ue_fs / foo_fs) * (foo_w / ue_w) -----------(5)

其中 `psd_rem`、`ue_fs`、`foo_w`、`ue_w` 皆为已知。

如，以 iPhone6 为基准设备，一个宽度为屏幕一半的元素在 iPhone6 plus 上，假设 `foo_fs`为已知，则：
    
    ue_fs=75px
    ue_w=375px
    foo_w=414px
    psd_rem=2.5rem
    foo_fs=69px

则：

    foo_rem = 2.5 * (75 / 69) * (414 / 375) = 3rem
即：
    
    3rem = 3 * 69 = 207 = foo_w / 2

因此，在 `scale` 设为_1_的条件下，实现与UE图同比例的排版，与 dpr 并无关系。

现在问题即为确定 `foo_fs` 的值，即设备上\<html\>元素 _font-size_ 的值。

设：

    β = (ue_fs / foo_fs) * (foo_w / ue_w)

由(5)可知：

    foo_rem = psd_rem * β

一般地，希望 `foo_rem` 与 `psd_rem` 都为整数或有限小数，因此 `β` 应为整数或有限小数。于是 `ue_fs / foo_fs` 与 `foo_w / ue_w` 应为整数或有限小数。或者 `ue_fs / ue_w` 与 `foo_w / foo_fs` 应为整数或有限小数。

通过人工定义可以保证 `ue_fs / ue_w` 为整数或有限小数，因此：

    foo_fs = foo_w * n

`n` 为整数或有限小数。

如果设置 `scale` 为 `1 / dpr`，则 `foo_w / dpr`  一定为整数，于是：

    foo_fs = foo_w * (10 / dpr) = foo_w * n

举前端的例子，设定
    
    ue_fs=75px
    ue_w=375px
    foo_w=1242px
    psd_rem=2.5rem
    foo_fs=41.4px

则，

    foo_rem = 2.5 * (75 / 41.4) * (1242 / 375) = 15rem

    15rem = 15 * 41.4px = 621px = foo_w / 2

证明。

## 结论
 - 只要计算出设备宽度，并为\<html\>设定合适的 _font-size_，就可以实现最终效果与UE图等比例，与 dpr 无关；
 - 为了得到有限小数或整数的 _font-size_，设置 `scale` 为 `1 / dpr`