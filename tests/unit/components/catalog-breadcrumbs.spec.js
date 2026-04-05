import {shallowMount, RouterLinkStub} from '@vue/test-utils';
import {categories} from '../../fixtures/categories-fixture';
import CatalogBreadcrumbs from '@/components/catalog/catalog-breadcrumbs';

describe("catalog-breadcrumbs", () => {

  let wrapper;

  const HOME_TEXT = "homepage";
  const PRODUCTS = "Товары";
  const SERVICES = "Услуги";

  const INITIAL_LINKS_COUNT_BASED_ON_FIXTURE = categories.length;
  const LINSK_COUNT_AFTER_HOME_CATEGORY_ACTIVATED = INITIAL_LINKS_COUNT_BASED_ON_FIXTURE + 2;

  const findLinkByText = (text) =>
    wrapper.findAll("a").wrappers.find((w) => w.text() === text);

  const createComponent = (props) => {
    wrapper = shallowMount(CatalogBreadcrumbs, {
      propsData: props,
      mocks: {
        $t: (text) => text,
        localePath: (path) => path
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  };

  it("correct renders main categories when props passed", () => {
    createComponent({categories});

    expect(wrapper.findAllComponents(RouterLinkStub).length).toBe(INITIAL_LINKS_COUNT_BASED_ON_FIXTURE);
    expect(findLinkByText(HOME_TEXT).exists()).toBe(true);
  })

  it("renders child categories dropdown on mouseover", async () => {
    createComponent({categories});
    await findLinkByText(HOME_TEXT).trigger("mouseover");

    expect(wrapper.findAllComponents(RouterLinkStub).length).toBe(LINSK_COUNT_AFTER_HOME_CATEGORY_ACTIVATED);

    expect(findLinkByText(PRODUCTS).exists()).toBe(true);
    expect(findLinkByText(SERVICES).exists()).toBe(true);
  })

  it("hides child categories dropdown on mouseleave", async () => {
    createComponent({categories});

    const homeLink = findLinkByText(HOME_TEXT);
    await homeLink.trigger("mouseover");

    expect(wrapper.findAllComponents(RouterLinkStub).length).toBe(LINSK_COUNT_AFTER_HOME_CATEGORY_ACTIVATED);

    await wrapper.find(".active").trigger("mouseleave");
    expect(wrapper.findAllComponents(RouterLinkStub).length).toBe(INITIAL_LINKS_COUNT_BASED_ON_FIXTURE);

    expect(findLinkByText(PRODUCTS)).toBeUndefined();
    expect(findLinkByText(SERVICES)).toBeUndefined();
  })

  it('renders nothing when categories is empty', () => {
    createComponent({ categories: []});
    expect(wrapper.text()).toBe('');
  })

  it('renders nothing when nothing passed', () => {
    createComponent();
    expect(wrapper.text()).toBe('');
  })
})
