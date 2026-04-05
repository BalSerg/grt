<template>
  <div class="scroll-nav">
    <div class="scroll-nav__sticky">
      <nav>
        <ul>
          <li class="active"><a href="#">Section 1</a></li>
          <li><a href="#">Section 2</a></li>
          <li><a href="#">Section 3</a></li>
          <li><a href="#">Section 4</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.scroll-nav {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  left: auto;
  width: 200px;
  box-sizing: border-box;
  border-left: 1px solid #e7e7e7;

  @media screen and (max-width: $desktop-mid) {
    display: none;
  }

  &__sticky {
    position: sticky;
    top: 12px;
    padding: 0;
    background-color: #ffffff;

    & > nav {
      display: block;
      padding: 0;
      margin: 0;
      line-height: 1;

      & > ul {
        display: block;
        padding: 0;
        margin: 0;

        & > li {
          display: block;
          padding: 0;
          margin: 0;
          list-style: none;

          a {
            color: $text-black;
            text-decoration: none;
            display: block;
            padding: 6px 12px;
            position: relative;
            cursor: pointer;
          }

          &.active {
            a {
              color: $grt-blue;

              &::before {
                width: 3px;
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: -2px;
                background-color: $grt-blue;
              }
            }
          }
        }
      }
    }
  }
}
</style>