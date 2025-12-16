
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control, cache_page
from django.views.decorators.vary import vary_on_cookie, vary_on_headers


def cache_api_view(timeout, key_prefix):
    def decorator(view_method):
        return method_decorator(cache_control(
            private=True,
            no_cache=True,
            no_store=True,
            must_revalidate=True
        ))(
            method_decorator(vary_on_cookie)(
                method_decorator(vary_on_headers("Authorization"))(
                    method_decorator(cache_page(timeout, key_prefix=key_prefix))(
                        view_method
                    )
                )
            )
        )
    return decorator
