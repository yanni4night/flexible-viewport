# viewport 解决方案原理

## 目标

 - UE只输出一套基准UE图，即固定的宽度(px)
 - 在各种手机屏幕上，元素尺寸相对于宽度的比值保持不变，与UE图一致

## 手段

设基准UE图宽度为 `ue_w`，\<html\> 元素的 _font-size_ 为 `ue_fs px`。

在 PSD 上量得一个元素的宽度为 `psd_w px`，即 

    psd_rem = psd_w/ue_fs ---------(1)

在一个宽度为 `foo_w` 的设备上，该元素应该设定的宽度为 `x_w`。因为比值相同，则：

    x_w / foo_w =  psd_w / ue_w ---------(2)

设该设备上 \<html \> 的 _font-size_ 为 `foo_fs`。则

    foo_rem = x_w / foo_fs  -----------(3)

将(1)、(3)代入(2)，得：

    foo_rem * foo_fs / foo_w = psd_rem * ue_fs / ue_w
得出：

    foo_rem = psd_rem * (ue_fs / foo_fs) * (foo_w / ue_w)

其中 `psd_rem`、`ue_fs`、`foo_w`、`ue_w` 皆为已知。

如，以 iPhone6 为基准设备，一个宽度为屏幕一半的元素在 iPhone6 plus 上：
    
    ue_fs=75px
    ue_w=375px
    foo_w=414px
    psd_rem=2.5rem
    foo_fs=69px

则：

    foo_rem=2.5 * (75 / 69) * (414 / 375)=3rem
即：
    
    3rem = 3 * 69 = 207 = 414 / 2

因此，在 `scale` 设为_1_的条件下，实现与UE图同比例的排版，与 dpr 并无关系。